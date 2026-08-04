import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const STORAGE_KEY = "doc-negotiation-form-scroll-modal-dismissed-v1";
const UPWARD_SCROLL_DELTA = -18;
const negotiationFormPath = "/negotiate";
const modalPoints = ["Limits and maybes", "Signals and pacing", "Aftercare and exit plans"];

function hasDismissedModal() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function markModalDismissed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Ignore private browsing/sessionStorage failures.
  }
}

export function NewsletterScrollModal() {
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasDismissedModal()) return;

    let ticking = false;
    lastScrollY.current = window.scrollY;

    const evaluateScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const minimumScrollDepth = Math.max(720, window.innerHeight * 0.85);

      if (!hasTriggered.current && currentY > minimumScrollDepth && delta <= UPWARD_SCROLL_DELTA) {
        hasTriggered.current = true;
        setOpen(true);
      }

      lastScrollY.current = currentY;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        evaluateScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && hasTriggered.current) {
      markModalDismissed();
    }
  };

  const handleCtaClick = () => {
    hasTriggered.current = true;
    markModalDismissed();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[min(92vw,34rem)] overflow-hidden rounded-[1.75rem] border border-plum/10 bg-white p-0 text-[#1B1B1B] shadow-2xl">
        <div className="px-6 pb-7 pt-8 sm:px-8 sm:pb-8">
          <div className="flex items-start gap-3 pr-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral text-white">
              <ClipboardCheck className="h-5 w-5" aria-hidden strokeWidth={2.25} />
            </span>
            <div>
              <p className="section-label text-coral">Free form</p>
              <DialogTitle className="display-condensed mt-1 text-4xl leading-[0.9] text-coral sm:text-5xl">
                Play Party Negotiation Form
              </DialogTitle>
            </div>
          </div>

          <DialogDescription className="mt-5 font-display text-lg leading-relaxed text-plum/76">
            Talk through boundaries, risk, signals, logistics, and aftercare before you say yes at a
            play party.
          </DialogDescription>

          <ul className="mt-5 grid gap-2 text-sm font-semibold text-plum/78">
            {modalPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5BCEFA]" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Link
            to={negotiationFormPath}
            className="btn-editorial mt-6 w-full"
            onClick={handleCtaClick}
          >
            <span>Get the free form</span>
          </Link>

          <p className="mt-4 text-xs leading-relaxed text-plum/48">
            One email field. We will send you the checklist link.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
