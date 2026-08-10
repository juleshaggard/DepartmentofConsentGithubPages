/**
 * Central site configuration for Department of Consent.
 *
 * Values marked [PENDING APPROVAL] are placeholders awaiting confirmation
 * from Jules Darling. Environment variables (VITE_*) are safe-to-expose
 * browser values only — never put secrets here.
 */

const env = import.meta.env;
const defaultCalBaseUrl = "https://cal.com/jules-darling-3rhr9n";
const fallbackDiscoveryCallUrl = `${defaultCalBaseUrl}/meet-jules-call`;

const calBaseUrl = (env.VITE_CAL_BASE_URL || defaultCalBaseUrl).replace(/\/$/, "");
const calEventUrl = (slug: string) => (calBaseUrl ? `${calBaseUrl}/${slug}` : "");

const bookingLinks = {
  discoveryCall:
    env.VITE_CAL_DISCOVERY_CALL_URL ||
    calEventUrl("meet-jules-call") ||
    env.VITE_CALENDLY_DISCOVERY_CALL_URL ||
    fallbackDiscoveryCallUrl,
  coachingSession:
    env.VITE_CAL_COACHING_SESSION_URL ||
    calEventUrl("one-coaching-session") ||
    env.VITE_CALENDLY_COACHING_SESSION_URL ||
    "",
  deepDive:
    env.VITE_CAL_DEEP_DIVE_URL ||
    calEventUrl("deep-dive-session") ||
    env.VITE_CALENDLY_DEEP_DIVE_URL ||
    "",
  package:
    env.VITE_CAL_PACKAGE_URL ||
    calEventUrl("kink-curious-to-kink-confident") ||
    env.VITE_CALENDLY_PACKAGE_URL ||
    "",
  eventPrep:
    env.VITE_CAL_EVENT_PREP_URL ||
    calEventUrl("first-event-preparation") ||
    env.VITE_CALENDLY_EVENT_PREP_URL ||
    "",
  eventCompanionInquiry:
    env.VITE_CAL_EVENT_COMPANION_INQUIRY_URL ||
    calEventUrl("event-companion-consultation") ||
    env.VITE_CALENDLY_EVENT_COMPANION_INQUIRY_URL ||
    "",
};

export const siteConfig = {
  /** Public brand name */
  name: "Department of Consent",
  /** Legal entity name — falls back to brand name until supplied */
  legalName: env.VITE_LEGAL_NAME || "Department of Consent",
  /** Founder and coach */
  founder: "Jules Darling",
  /** Primary promise / tagline */
  tagline: "From kink-curious to kink-confident.",
  /** Public base URL (no trailing slash) */
  url: (
    env.VITE_SITE_URL || "https://juleshaggard.github.io/DepartmentofConsentGithubPages"
  ).replace(/\/$/, ""),
  /** Contact email */
  contactEmail: env.VITE_CONTACT_EMAIL || "support@departmentofconsent.com",

  /**
   * External scheduling URL (Cal.com, Calendly, Acuity...).
   * When empty, the booking page falls back to the inquiry form.
   */
  bookingUrl: env.VITE_BOOKING_URL || bookingLinks.discoveryCall,

  /** Scheduler URLs for the pricing flow. Cal.com env vars win; legacy Calendly vars stay as fallback. */
  bookingLinks,

  /**
   * Inquiry form endpoint (Formspree/Basin/own worker…). When empty, the
   * form shows a clear not-yet-connected state and offers email instead.
   */
  inquiryFormEndpoint: env.VITE_INQUIRY_FORM_ENDPOINT || "",

  /**
   * Newsletter provider config (Buttondown, Kit, Mailchimp, Loops…).
   * `endpoint` is a form-POST or API URL safe for browser use. When empty,
   * the email capture shows a development state and does not fake success.
   */
  newsletter: {
    provider: env.VITE_NEWSLETTER_PROVIDER || "",
    endpoint: env.VITE_NEWSLETTER_ENDPOINT || "",
    emailFieldName: env.VITE_NEWSLETTER_EMAIL_FIELD || "",
  },

  /** Public workshop waitlist URL — falls back to the inquiry form */
  workshopWaitlistUrl: env.VITE_WORKSHOP_WAITLIST_URL || "",

  /**
   * Analytics: Plausible (preferred). Set VITE_PLAUSIBLE_DOMAIN to enable.
   * No advertising pixels, session replay, or fingerprinting.
   */
  analytics: {
    googleAnalyticsId: env.VITE_GOOGLE_ANALYTICS_ID || "G-GYYJEDCDTZ",
    plausibleDomain: env.VITE_PLAUSIBLE_DOMAIN || "",
    plausibleScriptSrc: env.VITE_PLAUSIBLE_SRC || "https://plausible.io/js/script.js",
  },

  /** Social profiles — [PENDING APPROVAL], leave empty until supplied */
  socialLinks: [] as { label: string; url: string }[],

  /** Service area language used across the site */
  serviceArea: "San Francisco and the greater Bay Area",
  serviceAreaLine:
    "Virtual coaching. Selected in-person services in San Francisco and the greater Bay Area.",

  /** Default social sharing image (relative to site root) */
  defaultSocialImage: "/socialog.jpg",

  /** Public pricing for approved one-time services. */
  pricingDisplayMode: "listed" as "contact" | "listed",
  prices: {
    discoveryCall: "Free",
    coachingSession: "$175",
    deepDive: "$250",
    beginnerPackage: "$475",
    eventPrep: "$225",
    eventCompanion: "$795",
    introductoryConsultation: "Free",
    privateSession: "$175",
  },

  /** Feature flags */
  features: {
    /** Show the workshops "join the list" section */
    workshopList: true,
    /** Show the email guide capture */
    emailGuide: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
