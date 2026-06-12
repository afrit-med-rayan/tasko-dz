import { type ReactNode } from "react";

type BadgeVariant = "verified" | "amber" | "teal" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  verified: "bg-teal-wash text-teal-dark ring-1 ring-teal/10",
  amber: "bg-amber-light/60 text-amber-dark",
  teal: "bg-teal text-white",
  default: "bg-off-white text-mid-gray ring-1 ring-light-border/80",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${variant === "verified" ? "tracking-normal" : "uppercase tracking-wide"} ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
