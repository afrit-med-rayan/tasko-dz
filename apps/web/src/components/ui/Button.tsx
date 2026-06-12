import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "amber" | "ghost" | "outline-light";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-sm hover:bg-teal-dark hover:shadow-md active:scale-[0.98] disabled:bg-light-border disabled:text-mid-gray disabled:shadow-none",
  secondary:
    "bg-white border border-light-border text-charcoal hover:border-teal hover:text-teal hover:bg-teal-wash/50 disabled:border-light-border disabled:text-mid-gray",
  amber:
    "bg-amber text-white shadow-sm hover:bg-amber-dark hover:shadow-md active:scale-[0.98] disabled:bg-light-border disabled:text-mid-gray",
  ghost: "bg-transparent text-teal hover:bg-teal-wash",
  "outline-light":
    "bg-white text-teal border-2 border-white shadow-md hover:bg-teal-wash hover:shadow-lg active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-6 text-base w-full",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
      ) : (
        children
      )}
    </button>
  );
}
