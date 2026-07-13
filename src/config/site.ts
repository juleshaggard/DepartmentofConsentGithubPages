/**
 * Central site configuration for Department of Consent.
 *
 * Values marked [PENDING APPROVAL] are placeholders awaiting confirmation
 * from Jules Holloway. Environment variables (VITE_*) are safe-to-expose
 * browser values only — never put secrets here.
 */

const env = import.meta.env;

export const siteConfig = {
  /** Public brand name */
  name: "Department of Consent",
  /** Legal entity name — falls back to brand name until supplied */
  legalName: env.VITE_LEGAL_NAME || "Department of Consent",
  /** Founder and coach */
  founder: "Jules Holloway",
  /** Primary promise / tagline */
  tagline: "From kink-curious to kink-confident.",
  /** Public base URL (no trailing slash) */
  url: (
    env.VITE_SITE_URL || "https://juleshaggard.github.io/DepartmentofConsentGithubPages"
  ).replace(/\/$/, ""),
  /** Contact email */
  contactEmail: env.VITE_CONTACT_EMAIL || "support@departmentofconsent.com",

  /**
   * External scheduling URL (Cal.com, Calendly, Acuity…).
   * When empty, the booking page falls back to the inquiry form.
   */
  bookingUrl: env.VITE_BOOKING_URL || "",

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

  /**
   * Pricing display mode:
   * "contact"  — show “Contact for current pricing” (prices pending approval)
   * "listed"   — show prices from the prices map below
   */
  pricingDisplayMode: "contact" as "contact" | "listed",
  prices: {
    introductoryConsultation: "", // [ADD CURRENT PRICE]
    privateSession: "", // [ADD CURRENT PRICE]
    beginnerPackage: "", // [ADD CURRENT PRICE]
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
