import { Shield } from "lucide-react";

interface EscrowNoticeProps {
  title: string;
  amount?: string;
  subtitle?: string;
  compact?: boolean;
}

export function EscrowNotice({ title, amount, subtitle, compact }: EscrowNoticeProps) {
  return (
    <div className={`rounded-xl bg-teal-wash/80 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <Shield size={18} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-dark">{title}</p>
          {amount && <p className="mt-1 text-2xl font-bold tracking-tight text-charcoal">{amount}</p>}
          {subtitle && <p className="mt-0.5 text-sm text-mid-gray">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
