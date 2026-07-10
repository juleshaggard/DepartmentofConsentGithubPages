import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import footerWordmark from "@/assets/footer-wordmark.svg";

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

/** Black "DOC — Department of Consent" lockup from the artboard nav. */
function Lockup() {
  return (
    <span className="flex items-center gap-2">
      <span className="display-condensed text-[1.7rem] leading-none text-plum">DOC</span>
      <span className="label-condensed text-[0.55rem] leading-[1.15] text-plum">
        Department
        <br />
        of Consent
      </span>
    </span>
  );
}

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen grain bg-white flex flex-col overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="w-full border-b border-plum/10 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Department of Consent — Home" className="block shrink-0">
            <Lockup />
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
            <Link to="/book" className="btn-editorial !px-5 !py-2.5">
              Book an intro session
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
                <Link
                  to="/book"
                  onClick={() => setMenuOpen(false)}
                  className="btn-editorial w-full"
                >
                  Book an intro session
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
    <footer className="mt-20 border-t border-plum/10 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4 max-w-md">
            <Lockup />
            <p className="prose-doc !text-base">
              Practical kink and polyamory coaching for adults ready to move from curiosity into
              real-world exploration.
            </p>
            <p className="prose-doc !text-base">
              Virtual coaching and selected in-person services in San Francisco and the greater Bay
              Area.
            </p>
            <p className="label-condensed text-xs text-coral">For adults aged 18 and older.</p>
            <p className="text-sm">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="underline underline-offset-4 text-plum hover:text-coral"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="label-condensed text-[0.75rem] text-plum/75 hover:text-coral"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Giant multicolor wordmark from the artboard footer */}
      <div className="px-4 sm:px-8 max-w-[960px] mx-auto">
        <img src={footerWordmark} alt="" aria-hidden className="w-full h-auto block" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.legalName}. Coaching is educational and practical
          — not therapy, medical care, legal advice, or crisis support.
        </p>
      </div>
    </footer>
  );
}
