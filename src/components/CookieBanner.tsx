import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    try {
      if (!localStorage.getItem("doc-cookie-ack")) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem("doc-cookie-ack", "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div
      className={cn(
        "fixed left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-coral/20 bg-card/95 px-4 py-3 shadow-[0_14px_45px_oklch(0.22_0.04_20_/_0.12)] backdrop-blur-sm",
        isHome ? "bottom-4" : "bottom-24 sm:bottom-28",
      )}
    >
      <p className="text-xs text-foreground/80 flex-1">
        This static app uses local storage to remember your scenes in this browser.
      </p>
      <button
        onClick={accept}
        className="text-xs font-semibold text-link underline underline-offset-4 shrink-0"
      >
        Got it
      </button>
    </div>
  );
}
