const KINK_IN_TEN_FEED_URL = "https://www.kinkin10.com/feed.xml";
const KINK_IN_TEN_SITE_URL = "https://www.kinkin10.com/";
const FEED_CACHE_TTL_MS = 15 * 60 * 1_000;

export type PodcastEpisode = {
  title: string;
  url: string;
  audioUrl: string | null;
  description: string;
  publishedAt: string;
  durationSeconds: number | null;
  episodeNumber: number | null;
};

export type PodcastFeed = {
  title: string;
  description: string;
  websiteUrl: string;
  artworkUrl: string | null;
  episodes: PodcastEpisode[];
};

export const KINK_IN_TEN_LISTEN_LINKS = [
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/kink-in-10/id6794421135",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/apple-podcast.png",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/033Vq0mfhXFYmuDDKJKsO7",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/spotify.png",
  },
  {
    name: "Amazon Music",
    href: "https://music.amazon.com/podcasts/7e19f910-fa86-4b8d-a004-dee930dad941",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/AmazonMusic.png",
  },
  {
    name: "iHeartRadio",
    href: "https://iheart.com/podcast/339580347",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/iHeartRadio.png",
  },
  {
    name: "PlayerFM",
    href: "https://player.fm/series/3742396",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/PlayerFM.png",
  },
  {
    name: "Podchaser",
    href: "https://www.podchaser.com/podcasts/kink-in-10-6560079",
    logoUrl: "https://pbcdn1.podbean.com/fs1/site/images/admin5/Podchaser.webp",
  },
] as const;

let cachedFeed: { expiresAt: number; promise: Promise<PodcastFeed> } | null = null;

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_match, decimal: string) => String.fromCodePoint(Number(decimal)))
    .replace(/&#x([\da-f]+);/gi, (_match, hexadecimal: string) =>
      String.fromCodePoint(Number.parseInt(hexadecimal, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readTag(xml: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"),
  );
  return match?.[1] ? decodeXml(match[1]).trim() : "";
}

function readAttribute(xml: string, tag: string, attribute: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedAttribute = attribute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const element = xml.match(new RegExp(`<${escapedTag}\\b[^>]*>`, "i"))?.[0];
  if (!element) return "";
  const value = element.match(new RegExp(`${escapedAttribute}=["']([^"']+)["']`, "i"))?.[1];
  return value ? decodeXml(value).trim() : "";
}

function plainText(html: string) {
  return decodeXml(html)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function positiveInteger(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function parseKinkInTenFeed(xml: string): PodcastFeed {
  const channel = readTag(xml, "channel");
  if (!channel) throw new Error("Kink in 10 returned an invalid RSS feed.");

  const itemMatches = channel.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const channelWithoutItems = channel.replace(/<item\b[\s\S]*?<\/item>/gi, "");
  const episodes = itemMatches
    .map((item): PodcastEpisode | null => {
      const title = plainText(readTag(item, "title"));
      const url = readTag(item, "link");
      const publishedAt = readTag(item, "pubDate");
      if (!title || !url || !publishedAt) return null;

      const description = plainText(
        readTag(item, "description") || readTag(item, "itunes:summary"),
      );
      return {
        title,
        url,
        audioUrl: readAttribute(item, "enclosure", "url") || null,
        description,
        publishedAt,
        durationSeconds: positiveInteger(readTag(item, "itunes:duration")),
        episodeNumber: positiveInteger(readTag(item, "itunes:episode")),
      };
    })
    .filter((episode): episode is PodcastEpisode => Boolean(episode));

  if (episodes.length === 0) throw new Error("Kink in 10 has no published episodes.");

  return {
    title: plainText(readTag(channelWithoutItems, "title")) || "Kink in 10",
    description: plainText(readTag(channelWithoutItems, "description")),
    websiteUrl: KINK_IN_TEN_SITE_URL,
    artworkUrl:
      readAttribute(channelWithoutItems, "itunes:image", "href") ||
      readTag(readTag(channelWithoutItems, "image"), "url") ||
      null,
    episodes,
  };
}

async function requestKinkInTenFeed() {
  const response = await fetch(KINK_IN_TEN_FEED_URL, {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!response.ok) throw new Error("Kink in 10 could not be reached.");
  return parseKinkInTenFeed(await response.text());
}

export async function getKinkInTenFeed(): Promise<PodcastFeed> {
  const now = Date.now();
  if (cachedFeed && cachedFeed.expiresAt > now) return cachedFeed.promise;

  const promise = requestKinkInTenFeed();
  cachedFeed = { expiresAt: now + FEED_CACHE_TTL_MS, promise };
  try {
    return await promise;
  } catch (error) {
    if (cachedFeed?.promise === promise) cachedFeed = null;
    throw error;
  }
}
