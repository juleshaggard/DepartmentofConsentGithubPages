import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { NewsletterSignup } from "./NewsletterSignup";

const STORAGE_KEY = "doc-newsletter-scroll-modal-dismissed-v1";
const UPWARD_SCROLL_DELTA = -18;
const MODAL_KIT_FORM = {
  provider: "kit",
  endpoint: "https://app.kit.com/forms/9688724/subscriptions",
  emailFieldName: "email_address",
  kitFormId: "9688724",
  kitUid: "ae1eab16cb",
  kitFormat: "modal",
};

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[min(92vw,34rem)] overflow-hidden rounded-[1.75rem] border-0 bg-white p-0 text-[#1B1B1B] shadow-2xl">
        <DialogTitle className="sr-only">Join the Department of Consent mailing list</DialogTitle>
        <DialogDescription className="sr-only">
          Email-only signup for occasional Department of Consent notes.
        </DialogDescription>
        <div className="bg-pinkcard px-6 pb-7 pt-8 sm:px-8 sm:pb-8">
          <NewsletterSignup
            variant="modal"
            className="pr-7 sm:pr-8"
            formConfig={MODAL_KIT_FORM}
            onValidSubmit={markModalDismissed}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
