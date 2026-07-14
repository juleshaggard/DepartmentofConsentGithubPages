import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { NewsletterScrollModal } from "./NewsletterScrollModal";
import { NewsletterSignup } from "./NewsletterSignup";
import navLogo from "../../../assets/Logo.svg";

const NAV_ITEMS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Event Support", to: "/services/kink-event-accompaniment" },
  { label: "Guides", to: "/resources" },
  { label: "About", to: "/about" },
] as const;

const FOOTER_LINKS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Kink Coach in San Francisco", to: "/services/kink-coach-san-francisco" },
  { label: "Beginner BDSM Coaching", to: "/services/beginner-bdsm-coaching" },
  { label: "Polyamory Coaching", to: "/services/polyamory-coaching-for-beginners" },
  { label: "Event Accompaniment", to: "/services/kink-event-accompaniment" },
  { label: "Guides", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Book", to: "/book" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;

const navCtaLabel = "Book a Free Coaching Session";

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
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(hero);

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

      const syncHeaderToHero = () => {
        showHeader(heroElement.getBoundingClientRect().bottom <= 0);
      };

      syncHeaderToHero();

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

      return () => trigger.kill();
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

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="label-condensed text-[0.8125rem] text-plum hover:text-coral"
                activeProps={{ className: "label-condensed text-[0.8125rem] text-coral" }}
              >
                {item.label}
              </Link>
            ))}
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
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="label-condensed block py-2.5 text-base text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
      <NewsletterScrollModal />
    </div>
  );
}

function MarketingFooter() {
  return (
    <footer className="mt-0 bg-[#1B1B1B] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_0.8fr]">
          <div className="space-y-4 max-w-md">
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
            <p className="text-sm">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-white underline underline-offset-4 hover:text-coral"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <NewsletterSignup variant="footer" />

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="label-condensed text-[0.75rem] text-white/68 hover:text-coral"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 text-center">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} {siteConfig.legalName}. Coaching is educational and practical
          — not therapy, medical care, legal advice, or crisis support.
        </p>
      </div>
    </footer>
  );
}
