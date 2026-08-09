import { Link } from "@tanstack/react-router";

const SHOP_POLICY_LINKS = [
  { label: "Privacy Policy", to: "/shop/privacy-policy" },
  { label: "Returns & FAQ", to: "/shop/returns-faq" },
  { label: "Terms of Service", to: "/shop/terms-of-service" },
] as const;

export function ShopLegalNav() {
  return (
    <section className="border-t border-plum/12 bg-cream" aria-labelledby="shop-policies-title">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <p id="shop-policies-title" className="section-label text-coral">
          Shop policies
        </p>
        <nav aria-label="Shop policies" className="mt-5">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-plum/12 bg-plum/12 sm:grid-cols-3">
            {SHOP_POLICY_LINKS.map((item) => (
              <li key={item.to} className="bg-white">
                <Link
                  to={item.to}
                  className="label-condensed flex min-h-16 items-center justify-between gap-4 px-5 py-4 text-sm text-plum transition-colors hover:bg-coral hover:text-white focus-visible:bg-coral focus-visible:text-white focus-visible:outline-none"
                  activeProps={{ className: "bg-plum text-white" }}
                >
                  <span>{item.label}</span>
                  <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
