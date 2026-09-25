import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  showAlgerie?: boolean;
}

export function Logo({ className = "", variant = "default", showAlgerie = false }: LogoProps) {
  const wordmarkColor = variant === "light" ? "text-white" : "text-charcoal";
  const subColor = variant === "light" ? "text-white/40" : "text-mid-gray";

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      {/* Icon mark - matches the official logo exactly */}
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105">
        {/* Rounded square outline */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="22"
            ry="22"
            stroke="#1D9E75"
            strokeWidth="8"
            fill="white"
          />
          {/* T letterform */}
          <line
            x1="22"
            y1="32"
            x2="78"
            y2="32"
            stroke="#111210"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="32"
            x2="50"
            y2="76"
            stroke="#111210"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
        {/* Amber dot - top-right corner */}
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-amber ring-[2.5px] ring-white" />
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className={`text-xl font-bold tracking-tight ${wordmarkColor}`}>
          tasko
        </span>
        {showAlgerie && (
          <span className={`text-[9px] font-semibold uppercase tracking-[0.22em] ${subColor} mt-0.5`}>
            ALGERIE
          </span>
        )}
      </span>
    </Link>
  );
}
