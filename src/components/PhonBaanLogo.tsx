interface Props {
  /** Tailwind class for the icon-mark size (e.g. "h-8 w-8 sm:h-10 sm:w-10") */
  markClassName?: string;
  /** Tailwind class for the wordmark text size */
  textClassName?: string;
  /** Wordmark text color — accent (default) for light bg, white for dark */
  variant?: "accent" | "white";
}

export default function PhonBaanLogo({
  markClassName = "h-8 w-8 sm:h-9 sm:w-9",
  textClassName = "text-lg sm:text-xl",
  variant = "accent",
}: Props) {
  const textColor = variant === "white" ? "text-white" : "text-accent";
  return (
    <span className="flex items-center gap-2 sm:gap-2.5">
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={markClassName}
        role="img"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#00529C" />
        <g
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 32 L32 14 L52 32" />
          <path d="M18 30 L18 52 L46 52 L46 30" />
        </g>
        <rect x="28" y="38" width="8" height="14" rx="1.5" fill="#FFB81C" />
      </svg>
      <span
        className={`font-bold tracking-tight ${textColor} ${textClassName}`}
      >
        PhonBaan
      </span>
    </span>
  );
}
