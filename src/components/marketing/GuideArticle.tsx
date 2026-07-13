import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  Definition,
  Eyebrow,
  TextLink,
} from "@/components/marketing/primitives";
import { JsonLd } from "@/components/marketing/JsonLd";
import { articleJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { Guide, GuideBlock } from "@/content/guides";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.t) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "def":
      return <Definition term={block.term}>{block.text}</Definition>;
    case "links":
      return (
        <p className="flex flex-wrap gap-x-6 gap-y-2 !mt-5">
          {block.items.map((l) => (
            <TextLink key={l.to} to={l.to}>
              {l.label}
            </TextLink>
          ))}
        </p>
      );
  }
}

export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <MarketingLayout>
      <article>
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: "Home", path: "/" },
              { label: "Guides", path: "/resources" },
              { label: guide.crumbLabel, path: guide.path },
            ]}
          />
          <header className="mx-auto max-w-3xl">
            <Eyebrow>Beginner guide</Eyebrow>
            <h1 className="max-w-[22ch] display-condensed text-coral text-4xl sm:text-5xl">
              {guide.h1}
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              By {siteConfig.founder} · Published {formatDate(guide.datePublished)}
              {guide.dateModified && guide.dateModified !== guide.datePublished
                ? ` · Updated ${formatDate(guide.dateModified)}`
                : ""}
            </p>
          </header>

          <div className="prose-doc mt-8">
            {guide.intro.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {guide.sections.map((section) => (
            <section key={section.heading ?? "section"} className="mt-10">
              {section.heading && (
                <h2 className="font-display text-2xl sm:text-3xl text-plum leading-tight mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="prose-doc">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          <aside className="mt-14 rounded-3xl bg-pinkcard px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="font-display text-2xl sm:text-3xl text-plum leading-tight">
              {guide.cta.headline}
            </h2>
            {guide.cta.body && <p className="prose-doc mt-3">{guide.cta.body}</p>}
            <div className="mt-6">
              <ButtonLink to={guide.cta.to}>{guide.cta.label}</ButtonLink>
            </div>
          </aside>

          {guide.related.length > 0 && (
            <nav aria-label="Related reading" className="mt-12 mb-4">
              <h2 className="section-label !mb-3">Keep reading</h2>
              <ul className="space-y-2">
                {guide.related.map((r) => (
                  <li key={r.to}>
                    <TextLink to={r.to}>{r.label}</TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Container>
      </article>

      <JsonLd
        data={articleJsonLd({
          headline: guide.h1,
          description: guide.description,
          path: guide.path,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
        })}
      />
    </MarketingLayout>
  );
}
