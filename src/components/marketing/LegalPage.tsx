import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, Container } from "@/components/marketing/primitives";

export const LEGAL_LAST_UPDATED = "July 9, 2026";

export function LegalPage({
  title,
  path,
  children,
  draftNotice = true,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
  draftNotice?: boolean;
}) {
  return (
    <MarketingLayout>
      <Container className="pt-8 sm:pt-12 pb-16">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: title, path },
          ]}
        />
        <h1 className="font-display text-4xl sm:text-5xl text-plum leading-[1.05]">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LEGAL_LAST_UPDATED}</p>
        {draftNotice && (
          <p className="mt-5 max-w-2xl rounded-xl border border-maybe bg-maybe/10 px-5 py-3.5 text-sm text-plum">
            <strong>Draft:</strong> this page has not yet been reviewed by an attorney. It must be
            reviewed and approved by qualified counsel before launch.
          </p>
        )}
        <div className="prose-doc mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-plum [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-plum [&_h3]:mt-5 [&_h3]:mb-2">
          {children}
        </div>
      </Container>
    </MarketingLayout>
  );
}
