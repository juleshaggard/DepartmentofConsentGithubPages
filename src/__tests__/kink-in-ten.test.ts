import { describe, expect, it } from "vitest";
import { parseKinkInTenFeed } from "@/lib/kink-in-ten";

const FEED = `<?xml version="1.0"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Kink in 10</title>
    <description><![CDATA[<p>Quick &amp; honest conversations.</p>]]></description>
    <itunes:image href="https://example.com/artwork.jpg" />
    <item>
      <title>Consent: Leave them better than you found them</title>
      <link>https://www.kinkin10.com/e/consent/</link>
      <pubDate>Tue, 04 Aug 2026 09:53:52 -0700</pubDate>
      <description><![CDATA[<p>Leave someone feeling safer &amp; more seen.</p>]]></description>
      <itunes:duration>603</itunes:duration>
      <itunes:episode>3</itunes:episode>
    </item>
  </channel>
</rss>`;

describe("Kink in 10 RSS feed", () => {
  it("normalizes real episode fields and strips description markup", () => {
    const feed = parseKinkInTenFeed(FEED);

    expect(feed.title).toBe("Kink in 10");
    expect(feed.description).toBe("Quick & honest conversations.");
    expect(feed.artworkUrl).toBe("https://example.com/artwork.jpg");
    expect(feed.episodes).toEqual([
      {
        title: "Consent: Leave them better than you found them",
        url: "https://www.kinkin10.com/e/consent/",
        description: "Leave someone feeling safer & more seen.",
        publishedAt: "Tue, 04 Aug 2026 09:53:52 -0700",
        durationSeconds: 603,
        episodeNumber: 3,
      },
    ]);
  });

  it("rejects a feed without published episodes", () => {
    expect(() =>
      parseKinkInTenFeed("<rss><channel><title>Kink in 10</title></channel></rss>"),
    ).toThrow("no published episodes");
  });
});
