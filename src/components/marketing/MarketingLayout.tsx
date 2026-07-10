import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import wordmark from "@/assets/site-logo.svg";

const NAV_ITEMS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Event Support", to: "/services/kink-event-accompaniment" },
  { label: "Workshops", to: "/workshops" },
  { label: "Guides", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
] as const;

const FOOTER_LINKS = [
  { label: "Coaching", to: "/coaching" },
  { label: "Kink Coach in San Francisco", to: "/services/kink-coach-san-francisco" },
  { label: "Beginner BDSM Coaching", to: "/services/beginner-bdsm-coaching" },
  { label: "Polyamory Coaching", to: "/services/polyamory-coaching-for-beginners" },
  { label: "Event Accompaniment", to: "/services/kink-event-accompaniment" },
  { label: "Workshops", to: "/workshops" },
  { label: "Guides", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Book", to: "/book" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen grain bg-background flex flex-col overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="w-full border-b border-plum/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Department of Consent — Home" className="block shrink-0">
            <img src={wordmark} alt="Department of Consent" className="h-7 sm:h-8 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-plum/80 hover:text-plum underline-offset-4 hover:underline"
                activeProps={{ className: "text-sm font-semibold text-coral" }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/book" className="btn-editorial !px-5 !py-2.5 text-sm">
              Book a session
            </Link>
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
            className="lg:hidden border-t border-plum/10 bg-card px-5 py-4"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-base font-semibold text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/book"
                  onClick={() => setMenuOpen(false)}
                  className="btn-editorial w-full"
                >
                  Book a session
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <MarketingFooter />
    </div>
  );
}

function MarketingFooter() {
  return (
    <footer className="bg-plum text-cream mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 max-w-md">
            <p className="font-display text-2xl leading-snug">Department of Consent</p>
            <p className="text-sm leading-relaxed opacity-85">
              Practical kink and polyamory coaching for adults ready to move from curiosity into
              real-world exploration.
            </p>
            <p className="text-sm leading-relaxed opacity-85">
              Virtual coaching and selected in-person services in San Francisco and the greater Bay
              Area.
            </p>
            <p className="text-sm font-semibold opacity-95">For adults aged 18 and older.</p>
            <p className="text-sm opacity-85">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="underline underline-offset-4 hover:opacity-80"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="opacity-85 hover:opacity-100 hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline !border-cream/20 mt-10 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs opacity-75">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Coaching is educational and
            practical — not therapy, medical care, legal advice, or crisis support.
          </p>
        </div>
      </div>
    </footer>
  );
}
