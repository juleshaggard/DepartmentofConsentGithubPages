import { WhipLoader } from "@/components/WhipLoader";

export function ShopLoadingState({ label = "Loading the shop…" }: { label?: string }) {
  return (
    <div className="flex min-h-[55vh] items-center justify-center px-5 py-20">
      <WhipLoader size={84} label={label} />
    </div>
  );
}

export function ShopErrorState({
  title = "The shop did not load.",
  body = "Fourthwall may be having a moment. Your cart and the rest of Department of Consent are still safe.",
  onRetry,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="section-label text-coral">Department of Consent shop</p>
      <h1 className="font-display text-4xl text-plum sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md font-display text-lg leading-relaxed text-plum/70">{body}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-editorial mt-7">
          <span>Try again</span>
        </button>
      )}
    </section>
  );
}

export function EmptyCollectionState() {
  return (
    <div className="rounded-2xl border border-plum/12 bg-white px-6 py-16 text-center">
      <h2 className="font-display text-3xl text-plum">Nothing is on this shelf yet.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-plum/65">
        This collection is live, but Fourthwall has no public products assigned to it right now.
      </p>
    </div>
  );
}
