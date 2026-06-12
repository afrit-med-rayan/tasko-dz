"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { OrderStatus } from "@/lib/demo-data";

const styles: Record<OrderStatus, string> = {
  ACTIVE: "bg-amber-light/70 text-amber-dark",
  DELIVERED: "bg-teal-wash text-teal-dark",
  COMPLETED: "bg-success text-success-dark",
  PENDING_PAYMENT: "bg-off-white text-mid-gray ring-1 ring-light-border",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useLocale();
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {t.dashboard.status[status]}
    </span>
  );
}
