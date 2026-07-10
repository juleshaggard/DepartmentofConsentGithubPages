import { publicSiteUrl } from "@/lib/app-url";
import { siteConfig } from "@/config/site";

type PageSeo = {
  title: string;
  description: string;
  /** Router path, e.g. "/coaching" — used for the canonical URL */
  path: string;
  ogType?: "website" | "article";
  /** Absolute or site-relative social image; falls back to the site default */
  image?: string;
  noindex?: boolean;
};

/**
 * Builds the head() payload for a public page: title, description,
 * canonical URL, and Open Graph / Twitter metadata.
 */
export function pageHead({
  title,
  description,
  path,
  ogType = "website",
  image,
  noindex,
}: PageSeo) {
  const canonical = publicSiteUrl(path === "/" ? "/" : path.replace(/\/$/, ""));
  const socialImage = image
    ? image.startsWith("http")
      ? image
      : publicSiteUrl(image)
    : publicSiteUrl(siteConfig.defaultSocialImage);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: ogType },
      { property: "og:image", content: socialImage },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

/** Breadcrumb trail item for visible breadcrumbs + BreadcrumbList JSON-LD */
export type Crumb = { label: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: publicSiteUrl(c.path === "/" ? "/" : c.path.replace(/\/$/, "")),
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: "Kink and polyamory coach",
    worksFor: { "@type": "Organization", name: siteConfig.name, url: publicSiteUrl("/") },
    url: publicSiteUrl("/about"),
    email: siteConfig.contactEmail,
    areaServed: siteConfig.serviceArea,
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: publicSiteUrl(path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: publicSiteUrl("/"),
    },
    ...(areaServed ? { areaServed } : {}),
    audience: { "@type": "Audience", audienceType: "Adults 18+" },
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: publicSiteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.founder,
      url: publicSiteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: publicSiteUrl("/"),
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
