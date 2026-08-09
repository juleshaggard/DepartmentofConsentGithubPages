import { Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const SHOP_POLICY_LAST_UPDATED = "August 9, 2026";

export function ShopPolicyPage({
  title,
  path,
  eyebrow = "Shop policy",
  children,
}: {
  title: string;
  path: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Department of Consent", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: title, path },
        ])}
      />
      <article className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-plum/58">
          <Link to="/shop" className="underline-offset-4 hover:text-coral hover:underline">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span>{title}</span>
        </nav>

        <header className="max-w-4xl border-b border-plum/12 pb-10 sm:pb-12">
          <p className="section-label text-coral">{eyebrow}</p>
          <h1 className="mt-3 font-display text-[clamp(3.4rem,9vw,7rem)] leading-[0.9] text-plum">
            {title}
          </h1>
          <p className="mt-5 text-sm text-plum/55">Last updated: {SHOP_POLICY_LAST_UPDATED}</p>
        </header>

        <aside className="mt-8 max-w-3xl border-l-4 border-maybe bg-maybe/12 px-5 py-4 text-sm leading-relaxed text-plum sm:px-6">
          <strong>Legal review notice:</strong> This policy is adapted from Fourthwall storefront
          templates and has not been independently reviewed by an attorney. It is provided for
          information only and should not replace advice from qualified counsel.
        </aside>

        <div className="prose-doc mt-10 max-w-3xl [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-plum [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:font-semibold [&_h3]:text-plum">
          {children}
        </div>
      </article>
    </>
  );
}
