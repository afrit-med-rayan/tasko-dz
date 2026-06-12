import { ShieldCheck } from "lucide-react";
import { Badge } from "./Badge";

interface VerifiedBadgeProps {
  label: string;
  className?: string;
}

export function VerifiedBadge({ label, className = "" }: VerifiedBadgeProps) {
  return (
    <Badge variant="verified" className={`gap-1 ${className}`}>
      <ShieldCheck size={12} strokeWidth={2.5} />
      {label}
    </Badge>
  );
}
