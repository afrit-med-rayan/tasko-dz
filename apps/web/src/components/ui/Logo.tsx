import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const wordmark = variant === "light" ? "text-white" : "text-charcoal";

  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[22%] bg-teal text-base font-bold text-white shadow-sm transition-transform group-hover:scale-105">
        T
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber ring-2 ring-white" />
      </span>
      <span className={`text-xl font-bold tracking-tight ${wordmark}`}>
        tasko<span className="text-amber">.</span>
      </span>
    </Link>
  );
}
