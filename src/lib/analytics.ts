type BookingAnalyticsEvent =
  | "pricing_page_view"
  | "coaching_page_view"
  | "discovery_call_click"
  | "coaching_session_click"
  | "deep_dive_click"
  | "package_click"
  | "event_prep_click"
  | "event_companion_inquiry_click"
  | "scheduler_opened";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBookingAction(eventName: BookingAnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    event_category: "booking",
    transport_type: "beacon",
  });
}
