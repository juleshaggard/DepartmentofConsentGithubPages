import { useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Podcast, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { CtaColorFill } from "./CtaColorFill";
import { NewsletterScrollModal } from "./NewsletterScrollModal";
import { NewsletterSignup } from "./NewsletterSignup";
import navLogo from "../../../assets/Logo.svg";

const NAV_ITEMS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Guides", to: "/zines" },
  { label: "Shop", to: "/shop" },
  { label: "Podcast", href: "https://www.kinkin10.com/", icon: Podcast },
] as const;

const FOOTER_LINKS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Kink Coach in San Francisco", to: "/services/kink-coach-san-francisco" },
  { label: "Beginner BDSM Coaching", to: "/services/beginner-bdsm-coaching" },
  { label: "Polyamory Coaching", to: "/services/polyamory-coaching-for-beginners" },
  { label: "Event Accompaniment", to: "/services/kink-event-accompaniment" },
  { label: "Shop", to: "/shop" },
  { label: "Zines", to: "/zines" },
  { label: "Guides", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Book", to: "/book" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;

const navCtaLabel = "Book a Free Coaching Session";
const NEWSLETTER_MODAL_DISABLED_PATHS = new Set([
  "/negotiate",
  "/play-party-negotiation-form",
  "/play-party-negotiation-checklist",
]);

/** "DOC — Department of Consent" lockup from the artboard nav. */
export function Lockup({ light = false }: { light?: boolean }) {
  const color = light ? "text-white" : "text-plum";
  return (
    <span className="flex items-center gap-2">
      <span className={`display-condensed text-[1.7rem] leading-none ${color}`}>DOC</span>
      <span className={`label-condensed text-[0.55rem] leading-[1.15] ${color}`}>
        Department
        <br />
        of Consent
      </span>
    </span>
  );
}

function PrideFlag({ label }: { label: string }) {
  const stripes = ["#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982"];

  return (
    <svg className="footer-flag" viewBox="0 0 48 30" role="img" aria-label={label}>
      {stripes.map((color, index) => (
        <rect key={color} x="0" y={index * 5} width="48" height="5" fill={color} />
      ))}
    </svg>
  );
}

function TransPrideFlag({ label }: { label: string }) {
  const stripes = ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"];

  return (
    <svg className="footer-flag" viewBox="0 0 48 30" role="img" aria-label={label}>
      {stripes.map((color, index) => (
        <rect key={`${color}-${index}`} x="0" y={index * 6} width="48" height="6" fill={color} />
      ))}
    </svg>
  );
}

function KinkPrideFlag({ label }: { label: string }) {
  const stripes = [
    "#111111",
    "#0046AD",
    "#111111",
    "#0046AD",
    "#FFFFFF",
    "#0046AD",
    "#111111",
    "#0046AD",
    "#111111",
  ];

  return (
    <svg className="footer-flag" viewBox="0 0 48 30" role="img" aria-label={label}>
      {stripes.map((color, index) => (
        <rect
          key={`${color}-${index}`}
          x="0"
          y={index * (30 / 9)}
          width="48"
          height={30 / 9}
          fill={color}
        />
      ))}
      <path
        d="M10.4 18.3 6.7 14.8C3.8 12 2.4 10.1 2.4 7.7c0-2.5 1.9-4.4 4.4-4.4 1.5 0 2.8.7 3.6 1.9.9-1.2 2.2-1.9 3.7-1.9 2.5 0 4.4 1.9 4.4 4.4 0 2.4-1.4 4.3-4.3 7.1l-3.8 3.5Z"
        fill="#E6313A"
        transform="translate(2.2 2.2) scale(.72)"
      />
    </svg>
  );
}

export function MarketingLayout({
  children,
  hero,
  mainRef,
}: {
  children: React.ReactNode;
  /**
   * Optional full-bleed hero rendered behind the first viewport. When present,
   * the fixed nav stays hidden until the hero has scrolled away.
   */
  hero?: React.ReactNode;
  /** Scope ref for page-level GSAP animations. */
  mainRef?: React.Ref<HTMLDivElement>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(hero);
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  const isShopPath = normalizedPathname.startsWith("/shop");
  const isZinePath = normalizedPathname.startsWith("/zines");
  const showNewsletterModal =
    !isShopPath && !isZinePath && !NEWSLETTER_MODAL_DISABLED_PATHS.has(normalizedPathname);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const reduceMotion = prefersReducedMotion();
      let headerVisible: boolean | null = null;
      const showHeader = (visible: boolean) => {
        if (headerVisible === visible) return;
        headerVisible = visible;

        const nextState = {
          autoAlpha: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          y: visible ? 0 : -(header.offsetHeight + 4),
        };

        if (reduceMotion) {
          gsap.set(header, nextState);
          return;
        }

        gsap.to(header, {
          ...nextState,
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        });
      };

      if (menuOpen) {
        showHeader(true);
        return;
      }

      const heroElement = heroRef.current;
      if (!heroElement) {
        showHeader(true);
        return;
      }

      const mobileQuery = window.matchMedia("(max-width: 1023px)");
      let stableViewportHeight = window.innerHeight;

      const syncHeaderToHero = () => {
        const mobileRevealOffset = mobileQuery.matches
          ? Math.min(stableViewportHeight * 0.35, 280)
          : 0;
        showHeader(heroElement.getBoundingClientRect().bottom <= mobileRevealOffset);
      };

      const updateStableViewportHeight = () => {
        stableViewportHeight = window.innerHeight;
        syncHeaderToHero();
      };

      const handleResize = () => {
        if (mobileQuery.matches) return;
        updateStableViewportHeight();
      };

      const handleOrientationChange = () => {
        window.requestAnimationFrame(() => {
          stableViewportHeight = window.innerHeight;
          syncHeaderToHero();
        });
      };

      const addMobileQueryListener = () => {
        if (typeof mobileQuery.addEventListener === "function") {
          mobileQuery.addEventListener("change", updateStableViewportHeight);
          return;
        }

        mobileQuery.addListener(updateStableViewportHeight);
      };

      const removeMobileQueryListener = () => {
        if (typeof mobileQuery.removeEventListener === "function") {
          mobileQuery.removeEventListener("change", updateStableViewportHeight);
          return;
        }

        mobileQuery.removeListener(updateStableViewportHeight);
      };

      syncHeaderToHero();

      window.addEventListener("scroll", syncHeaderToHero, { passive: true });
      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleOrientationChange);
      addMobileQueryListener();

      const trigger = ScrollTrigger.create({
        trigger: heroElement,
        start: "top top",
        end: "bottom top",
        onEnter: syncHeaderToHero,
        onEnterBack: syncHeaderToHero,
        onLeave: syncHeaderToHero,
        onLeaveBack: syncHeaderToHero,
        onRefresh: syncHeaderToHero,
        onUpdate: syncHeaderToHero,
      });

      return () => {
        trigger.kill();
        window.removeEventListener("scroll", syncHeaderToHero);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleOrientationChange);
        removeMobileQueryListener();
      };
    },
    { dependencies: [menuOpen], revertOnUpdate: true },
  );

  return (
    <div className="min-h-screen grain bg-white flex flex-col overflow-x-clip">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {hero && <div ref={heroRef}>{hero}</div>}

      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-40 w-full border-b border-plum/10 bg-white/94 backdrop-blur-md will-change-[transform,opacity] ${
          hasHero ? "pointer-events-none -translate-y-full opacity-0" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Department of Consent — Home" className="block shrink-0">
            <img src={navLogo} alt="Department of Consent" className="h-8 w-auto sm:h-9" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-7">
            {NAV_ITEMS.map((item) => {
              if ("href" in item) {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-condensed inline-flex items-center gap-1.5 text-[0.8125rem] text-plum hover:text-coral"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="label-condensed text-[0.8125rem] text-plum hover:text-coral"
                  activeProps={{ className: "label-condensed text-[0.8125rem] text-coral" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <a href={siteConfig.bookingLinks.discoveryCall} className="btn-editorial !px-5 !py-2.5">
              {navCtaLabel}
            </a>
          </nav>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-plum/20 p-2.5 text-plum"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="lg:hidden border-t border-plum/10 bg-white px-5 py-4"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                if ("href" in item) {
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="label-condensed flex items-center gap-2 py-2.5 text-base text-plum"
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                        {item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="label-condensed block py-2.5 text-base text-plum"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3">
                <a
                  href={siteConfig.bookingLinks.discoveryCall}
                  onClick={() => setMenuOpen(false)}
                  className="btn-editorial w-full"
                >
                  {navCtaLabel}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main-content" className={`flex-1 ${hasHero ? "" : "pt-[4.5rem] sm:pt-20"}`}>
        <div ref={mainRef}>{children}</div>
      </main>

      <MarketingFooter />
      {showNewsletterModal && <NewsletterScrollModal />}
      <CtaColorFill />
    </div>
  );
}

function MarketingFooter() {
  return (
    <footer className="mt-0 bg-[#1B1B1B] text-white">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 lg:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(17rem,0.9fr)_minmax(22rem,1fr)_minmax(18rem,0.9fr)] lg:items-start lg:gap-x-20 xl:gap-x-28">
          <div className="max-w-[22rem] space-y-5">
            <img
              src={navLogo}
              alt="Department of Consent"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="font-display text-base leading-relaxed text-white/78">
              Practical kink and polyamory coaching for adults ready to move from curiosity into
              real-world exploration.
            </p>
            <p className="font-display text-base leading-relaxed text-white/78">
              Virtual coaching and selected in-person services in San Francisco and the greater Bay
              Area.
            </p>
            <p className="label-condensed text-xs text-coral">For adults aged 18 and older.</p>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="label-condensed text-xs text-white/86">
                Department of Consent is trans-owned and run.
              </p>
              <div className="flex items-center gap-1.5">
                <PrideFlag label="Pride flag" />
                <TransPrideFlag label="Trans pride flag" />
                <KinkPrideFlag label="Kink pride flag" />
              </div>
            </div>
            <p className="text-sm">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-white underline underline-offset-4 hover:text-coral"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <NewsletterSignup variant="footer" className="w-full max-w-[28rem]" />

          <nav aria-label="Footer" className="lg:justify-self-end">
            <ul className="grid max-w-[24rem] grid-cols-2 gap-x-10 gap-y-3 sm:gap-x-14">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="label-condensed block text-[0.75rem] leading-snug text-white/68 hover:text-coral"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-7 sm:px-8">
        <div className="border-t border-white/10 pt-6">
          <p className="max-w-4xl text-left text-xs leading-relaxed text-white/45">
            © {new Date().getFullYear()} {siteConfig.legalName}. Coaching is educational and
            practical — not therapy, medical care, legal advice, or crisis support.
          </p>
        </div>
      </div>
    </footer>
  );
}
