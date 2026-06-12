import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = "sm",
  showValue = true,
  reviewCount,
  className = "",
}: StarRatingProps) {
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`${rating} sur ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={i < Math.round(rating) ? "fill-amber text-amber" : "fill-light-border/40 text-light-border"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && (
        <span className={`font-medium text-charcoal ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="font-normal text-mid-gray"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
