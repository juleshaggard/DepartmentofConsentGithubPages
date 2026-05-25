import { Link, useLocation } from "@tanstack/react-router";
import { CloudButton } from "@/components/CloudButton";
import { ListChecks, Plus, User } from "lucide-react";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import wordmark from "@/assets/site-logo.svg";

export function Layout({
  children,
  fullBleed = false,
  showFooter = false,
}: {
  children: React.ReactNode;
  fullBleed?: boolean;
  showFooter?: boolean;
}) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="min-h-screen grain bg-background flex flex-col overflow-x-hidden">
      {!isHome && (
        <header className="w-full px-5 sm:px-10 pt-6 sm:pt-8 pb-2 flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" aria-label="Dept of Consent — Home" className="block">
            <img src={wordmark} alt="Dept of Consent" className="h-7 sm:h-8 w-auto" />
          </Link>
          <CloudButton to="/sessions/new" variant="outline" className="cloud-btn-sm">
            New scene
          </CloudButton>
        </header>
      )}
      <main
        className={
          fullBleed ? "flex-1 pb-24" : "flex-1 max-w-2xl w-full mx-auto px-5 pt-5 pb-40 sm:pt-6"
        }
      >
        {children}
      </main>
      {showFooter && <Footer />}
      <CookieBanner />
      {!isHome && <BottomNav />}
    </div>
  );
}

function BottomNav() {
  const items = [
    { to: "/sessions", label: "Scenes", Icon: ListChecks, exact: true },
    { to: "/sessions/new", label: "New scene", Icon: Plus, exact: false },
    { to: "/settings", label: "Profile", Icon: User, exact: false },
  ] as const;
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-full border border-coral/10 bg-card/95 shadow-[0_14px_45px_oklch(0.22_0.04_20_/_0.14)] backdrop-blur-sm">
      <ul className="grid grid-cols-3">
        {items.map(({ to, label, Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-plum/60 text-[11px] rounded-full"
              activeProps={{
                className:
                  "flex flex-col items-center justify-center gap-0.5 py-2.5 text-plum text-[11px] font-bold rounded-full bg-gradient-to-b from-blush/60 to-transparent",
              }}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
