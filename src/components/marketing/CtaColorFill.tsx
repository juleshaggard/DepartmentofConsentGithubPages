import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SVG_NS = "http://www.w3.org/2000/svg";
const COLORS = [
  "#E6313A",
  "#FF5C38",
  "#FFB200",
  "#2EB85C",
  "#0072E3",
  "#AB54F7",
  "#5BCEFA",
] as const;
const NUM_POINTS = 5;
const HIDDEN_Y = 106;
const FULL_Y = -6;
const POINT_DELAYS = [0.025, 0, 0.04, 0.012, 0.032];

type FillPoint = {
  y: number;
};

type ButtonFillState = {
  pointsByPath: FillPoint[][];
  render: () => void;
};

function getOverlay(button: HTMLElement) {
  return Array.from(button.children).find((child) =>
    child.classList.contains("cta-fill-overlay"),
  ) as SVGSVGElement | undefined;
}

function getPaths(button: HTMLElement) {
  return Array.from(button.querySelectorAll<SVGPathElement>(".cta-fill-path"));
}

function makePoints(initialY = HIDDEN_Y) {
  return Array.from({ length: NUM_POINTS }, () => ({ y: initialY }));
}

function getGloopyPath(points: FillPoint[]) {
  const widthStep = 100 / (NUM_POINTS - 1);
  const firstY = points[0]?.y ?? HIDDEN_Y;
  let path = `M 0 ${firstY.toFixed(3)} C`;

  for (let index = 0; index < NUM_POINTS - 1; index += 1) {
    const nextX = (index + 1) * widthStep;
    const controlX = nextX - widthStep / 2;
    const currentY = points[index].y.toFixed(3);
    const nextY = points[index + 1].y.toFixed(3);

    path += ` ${controlX.toFixed(3)} ${currentY} ${controlX.toFixed(3)} ${nextY} ${nextX.toFixed(3)} ${nextY}`;
  }

  return `${path} V 106 H 0 Z`;
}

function createOverlay() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.classList.add("cta-fill-overlay");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  COLORS.forEach((color, index) => {
    const path = document.createElementNS(SVG_NS, "path");
    path.classList.add("cta-fill-path", `cta-fill-path-${index + 1}`);
    path.setAttribute("fill", color);
    path.setAttribute("d", getGloopyPath(makePoints()));
    svg.append(path);
  });

  return svg;
}

function ensureOverlay(button: HTMLElement) {
  let overlay = getOverlay(button);

  if (overlay && getPaths(button).length !== COLORS.length) {
    overlay.remove();
    overlay = undefined;
  }

  if (!overlay) {
    overlay = createOverlay();
    button.append(overlay);
  }

  button.classList.add("cta-fill-ready");
}

export function CtaColorFill() {
  useEffect(() => {
    const timelines = new WeakMap<HTMLElement, ReturnType<typeof gsap.timeline>>();
    const cleanups = new Map<HTMLElement, () => void>();
    const states = new WeakMap<HTMLElement, ButtonFillState>();

    const getState = (button: HTMLElement) => {
      const existing = states.get(button);
      if (existing) return existing;

      const state: ButtonFillState = {
        pointsByPath: COLORS.map(() => makePoints()),
        render: () => {
          const paths = getPaths(button);
          paths.forEach((path, index) => {
            const points = state.pointsByPath[index];
            if (points) path.setAttribute("d", getGloopyPath(points));
          });
        },
      };

      states.set(button, state);
      state.render();
      return state;
    };

    const animate = (button: HTMLElement, entering: boolean) => {
      if (button.matches(":disabled, [aria-disabled='true']")) return;

      ensureOverlay(button);
      const state = getState(button);

      timelines.get(button)?.kill();

      if (prefersReducedMotion()) {
        state.pointsByPath.flat().forEach((point) => {
          point.y = entering ? FULL_Y : HIDDEN_Y;
        });
        state.render();
        return;
      }

      const tl = gsap.timeline({
        defaults: { overwrite: true },
        onUpdate: state.render,
        onComplete: state.render,
      });
      timelines.set(button, tl);

      if (entering) {
        state.pointsByPath.forEach((points, pathIndex) => {
          points.forEach((point, pointIndex) => {
            const delay = pathIndex * 0.038 + POINT_DELAYS[pointIndex];
            const wobble = pointIndex % 2 === 0 ? -7 : 5;
            const overshoot = FULL_Y - 14 + wobble + pathIndex * 0.45;

            tl.to(
              point,
              {
                y: overshoot,
                duration: 0.34,
                ease: "expo.out",
              },
              delay,
            ).to(
              point,
              {
                y: FULL_Y,
                duration: 0.5,
                ease: "elastic.out(1, 0.74)",
              },
              delay + 0.24,
            );
          });
        });
        return;
      }

      [...state.pointsByPath].reverse().forEach((points, reverseIndex) => {
        points.forEach((point, pointIndex) => {
          const delay = reverseIndex * 0.045 + POINT_DELAYS[NUM_POINTS - 1 - pointIndex] * 0.45;
          const sag = HIDDEN_Y + 15 + (pointIndex % 2 === 0 ? 4 : -8);

          tl.to(
            point,
            {
              y: sag,
              duration: 0.46,
              ease: "power3.inOut",
            },
            delay,
          ).to(
            point,
            {
              y: HIDDEN_Y,
              duration: 0.28,
              ease: "power2.out",
            },
            delay + 0.34,
          );
        });
      });
    };

    const bindButton = (button: HTMLElement) => {
      ensureOverlay(button);

      if (cleanups.has(button)) return;

      const handleEnter = () => animate(button, true);
      const handleLeave = () => animate(button, false);

      button.addEventListener("pointerenter", handleEnter);
      button.addEventListener("pointerleave", handleLeave);
      button.addEventListener("focusin", handleEnter);
      button.addEventListener("focusout", handleLeave);

      cleanups.set(button, () => {
        button.removeEventListener("pointerenter", handleEnter);
        button.removeEventListener("pointerleave", handleLeave);
        button.removeEventListener("focusin", handleEnter);
        button.removeEventListener("focusout", handleLeave);
        timelines.get(button)?.kill();
        getOverlay(button)?.remove();
        button.classList.remove("cta-fill-ready");
      });
    };

    const prepareTree = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(".btn-editorial")) {
        bindButton(root);
      }

      root.querySelectorAll<HTMLElement>(".btn-editorial").forEach(bindButton);
    };

    prepareTree(document.body);

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            prepareTree(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      cleanups.clear();
    };
  }, []);

  return null;
}
