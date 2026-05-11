import Link from "next/link";

interface Props {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <div className="container-wrap flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
        <svg
          className="h-8 w-8 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="mb-3 font-display text-3xl font-bold text-ink">
        {title}
      </h1>
      <p className="mb-2 text-lg text-accent font-semibold">Coming Soon</p>
      {description && (
        <p className="mb-8 max-w-md text-ink-soft">{description}</p>
      )}
      <Link
        href="/"
        className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
