interface Props {
  id: string;
  size: "horizontal" | "square" | "in-article";
  className?: string;
}

const SIZE_CLASS: Record<Props["size"], string> = {
  horizontal: "min-h-[90px] sm:min-h-[100px]",
  square: "min-h-[250px] aspect-square sm:aspect-auto sm:min-h-[280px]",
  "in-article": "min-h-[180px]",
};

const SIZE_LABEL: Record<Props["size"], string> = {
  horizontal: "Horizontal 728×90",
  square: "Square 300×250",
  "in-article": "In-article",
};

export default function AdSlot({ id, size, className = "" }: Props) {
  return (
    <div
      data-ad-slot={id}
      data-ad-size={size}
      aria-hidden
      className={`mx-auto flex w-full max-w-3xl items-center justify-center rounded-xl border border-dashed border-line bg-white/40 text-center text-xs uppercase tracking-wider text-ink-soft/60 ${SIZE_CLASS[size]} ${className}`}
    >
      <span className="font-mono">[Ad placeholder · {SIZE_LABEL[size]}]</span>
    </div>
  );
}
