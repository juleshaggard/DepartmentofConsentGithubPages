import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, Eyebrow, Section } from "@/components/marketing/primitives";
import { JsonLd } from "@/components/marketing/JsonLd";
import {
  getKinkInTenFeed,
  KINK_IN_TEN_LISTEN_LINKS,
  type PodcastEpisode,
  type PodcastFeed,
} from "@/lib/kink-in-ten";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const KINK_IN_TEN_FEED_URL = "https://www.kinkin10.com/feed.xml";

export const Route = createFileRoute("/podcast")({
  loader: async () => {
    try {
      return { podcast: await getKinkInTenFeed() };
    } catch {
      return { podcast: null };
    }
  },
  staleTime: 60_000,
  head: () =>
    pageHead({
      title: "Kink in 10 Podcast | Department of Consent",
      description:
        "Listen to Kink in 10, Jules Darling's quick, candid podcast about BDSM, consent, power, play, and kink culture.",
      path: "/podcast",
    }),
  component: PodcastPage,
});

function formatEpisodeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDuration(seconds: number | null) {
  if (seconds === null) return "";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function episodeMeta(episode: PodcastEpisode) {
  return [
    episode.episodeNumber ? `Episode ${episode.episodeNumber}` : "",
    formatEpisodeDate(episode.publishedAt),
    formatDuration(episode.durationSeconds),
  ]
    .filter(Boolean)
    .join(" · ");
}

function PodcastPage() {
  const { podcast } = Route.useLoaderData();
  const playableEpisodes = podcast?.episodes.filter((episode) => episode.audioUrl) ?? [];
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState(
    playableEpisodes[0]?.url ?? podcast?.episodes[0]?.url ?? "",
  );
  const selectedEpisode =
    podcast?.episodes.find((episode) => episode.url === selectedEpisodeUrl) ??
    podcast?.episodes[0] ??
    null;

  return (
    <MarketingLayout>
      <Breadcrumbs
        crumbs={[
          { label: "Home", path: "/" },
          { label: "Podcast", path: "/podcast" },
        ]}
      />

      <PodcastHero podcast={podcast} />
      <PodcastPlayer episode={selectedEpisode} />
      <EpisodeArchive
        episodes={podcast?.episodes ?? []}
        selectedEpisodeUrl={selectedEpisode?.url ?? ""}
        onSelect={setSelectedEpisodeUrl}
      />

      {podcast && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            name: podcast.title,
            description: podcast.description,
            url: podcast.websiteUrl,
            webFeed: KINK_IN_TEN_FEED_URL,
            image: podcast.artworkUrl ?? undefined,
          }}
        />
      )}
    </MarketingLayout>
  );
}

function PodcastHero({ podcast }: { podcast: PodcastFeed | null }) {
  return (
    <Section wide className="bg-white !pb-16 !pt-12 sm:!pb-20 sm:!pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-[25rem] lg:mx-0">
          {podcast?.artworkUrl ? (
            <img
              src={podcast.artworkUrl}
              alt="Kink in 10 podcast artwork"
              width={1200}
              height={1200}
              loading="eager"
              decoding="async"
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
          ) : (
            <div className="relative grid aspect-square place-items-center rounded-[1.5rem] border-2 border-coral bg-cream px-8 text-center">
              <span className="display-condensed text-5xl leading-[0.9] text-coral">
                Kink in 10
              </span>
            </div>
          )}
        </div>

        <div className="text-center lg:text-left">
          <Eyebrow>The podcast</Eyebrow>
          <h1 className="display-condensed text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.82] text-coral">
            Kink in 10.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-display text-base leading-relaxed text-plum/76 sm:text-lg lg:mx-0">
            {podcast?.description ||
              "Quick, honest conversations about BDSM, consent, power exchange, toys, etiquette, relationships, and kink culture. Ten minutes or less. No gatekeeping. No shame."}
          </p>
          <div className="mobile-action-stack mt-8 flex flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a href="#listen" className="btn-editorial">
              <span>Start listening</span>
            </a>
            <a
              href={podcast?.websiteUrl ?? "https://www.kinkin10.com/"}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial btn-editorial-outline"
            >
              <span>Visit Kink in 10</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-16">
        <p className="label-condensed text-center text-xs text-coral lg:text-left">
          Listen wherever you get podcasts
        </p>
        <ul
          className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
          aria-label="Podcast platforms"
        >
          {KINK_IN_TEN_LISTEN_LINKS.map((platform) => (
            <li key={platform.name}>
              <a
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className="label-condensed inline-flex min-h-14 w-full items-center gap-3 rounded-full border border-plum/18 bg-white px-4 py-3 text-left text-xs text-plum transition-colors hover:border-coral hover:bg-coral hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 sm:w-auto sm:pr-5"
              >
                <img
                  src={platform.logoUrl}
                  alt=""
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <span>{platform.name}</span>
                <span className="ml-auto sm:ml-0" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-plum/58 lg:text-left">
          Prefer another podcast app?{" "}
          <a
            href={KINK_IN_TEN_FEED_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-plum underline underline-offset-4 hover:text-coral"
          >
            Copy the RSS feed
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

function PodcastPlayer({ episode }: { episode: PodcastEpisode | null }) {
  return (
    <Section wide className="bg-white !py-8 sm:!py-12">
      <div
        id="listen"
        className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-plum px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14"
      >
        <p className="label-condensed text-xs text-coral">Now in the player</p>
        {episode ? (
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] lg:items-end lg:gap-14">
            <div>
              <p className="label-condensed text-[0.7rem] text-white/52">{episodeMeta(episode)}</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-white sm:text-5xl">
                {episode.title}
              </h2>
              {episode.description && (
                <p className="mt-5 max-w-3xl font-display text-base leading-relaxed text-white/68 sm:text-lg">
                  {episode.description}
                </p>
              )}
            </div>

            <div>
              {episode.audioUrl ? (
                <audio
                  key={episode.audioUrl}
                  controls
                  preload="metadata"
                  className="podcast-audio-player block w-full"
                  aria-label={`Listen to ${episode.title}`}
                >
                  <source src={episode.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio player.
                </audio>
              ) : (
                <p className="font-display text-base leading-relaxed text-white/70">
                  Audio is temporarily unavailable here. The episode is still available on the
                  podcast site.
                </p>
              )}
              <a
                href={episode.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex font-semibold text-coral underline decoration-coral/50 underline-offset-4 hover:text-white"
              >
                Open episode details
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-4 max-w-2xl" role="status">
            <h2 className="font-display text-3xl text-white">The player is taking a moment.</h2>
            <p className="mt-3 font-display text-base leading-relaxed text-white/68">
              You can still listen through any of the podcast apps below.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

function EpisodeArchive({
  episodes,
  selectedEpisodeUrl,
  onSelect,
}: {
  episodes: PodcastEpisode[];
  selectedEpisodeUrl: string;
  onSelect: (episodeUrl: string) => void;
}) {
  return (
    <Section wide className="bg-cream !py-16 sm:!py-24">
      <div className="max-w-3xl">
        <Eyebrow>Episode archive</Eyebrow>
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.02] text-plum">
          Ten minutes. One useful question.
        </h2>
      </div>

      {episodes.length > 0 ? (
        <ol className="mt-10 space-y-4">
          {episodes.map((episode, index) => {
            const selected = episode.url === selectedEpisodeUrl;
            const playable = Boolean(episode.audioUrl);

            return (
              <li key={episode.url}>
                <button
                  type="button"
                  disabled={!playable}
                  aria-pressed={selected}
                  aria-label={playable ? `Load ${episode.title} in the audio player` : undefined}
                  onClick={() => {
                    onSelect(episode.url);
                    window.requestAnimationFrame(() => {
                      document.getElementById("listen")?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                          ? "auto"
                          : "smooth",
                        block: "start",
                      });
                    });
                  }}
                  className={cn(
                    "group grid w-full gap-4 rounded-[1.25rem] border bg-white px-5 py-5 text-left transition-colors sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:px-7 sm:py-6",
                    selected
                      ? "border-coral shadow-[0_10px_35px_rgb(252_81_66_/_0.09)]"
                      : "border-plum/10 hover:border-coral/65",
                    !playable && "cursor-not-allowed opacity-55",
                  )}
                >
                  <span className="display-condensed text-3xl leading-none text-coral">
                    {episode.episodeNumber
                      ? String(episode.episodeNumber).padStart(2, "0")
                      : String(episodes.length - index).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="label-condensed block text-[0.68rem] text-plum/48">
                      {episodeMeta(episode)}
                    </span>
                    <span className="mt-2 block font-display text-xl leading-tight text-plum sm:text-2xl">
                      {episode.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "label-condensed justify-self-start rounded-full px-4 py-2 text-xs sm:justify-self-end",
                      selected ? "bg-coral text-white" : "bg-plum text-white group-hover:bg-coral",
                    )}
                  >
                    {selected ? "In player" : playable ? "Play" : "Unavailable"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : (
        <div
          className="mt-10 rounded-[1.25rem] border border-plum/12 bg-white px-6 py-10"
          role="status"
        >
          <p className="font-display text-xl text-plum">Episodes are taking a moment to load.</p>
          <p className="mt-2 text-sm text-plum/64">
            The podcast links above will take you straight to the full archive.
          </p>
        </div>
      )}
    </Section>
  );
}
