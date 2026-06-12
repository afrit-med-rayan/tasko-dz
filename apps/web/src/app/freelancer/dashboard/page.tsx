"use client";

import Link from "next/link";
import {
  Wallet, Star, TrendingUp, ArrowUpRight,
  Plus, ShoppingBag,
} from "lucide-react";
import { DashboardShell, DashboardNewServiceButton } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { FREELANCER_DEMO } from "@/lib/demo-data";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

export default function FreelancerDashboardPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard.freelancer;
  const user = DEMO_USERS.freelancer;
  const data = FREELANCER_DEMO;

  return (
    <DashboardShell
      role="freelancer"
      userName={user.name}
      headerAction={<DashboardNewServiceButton />}
    >
      {/* Demo notice */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-teal/10 bg-teal-wash/70 px-4 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal/15 text-teal">
          <Star size={14} />
        </div>
        <p className="text-sm text-teal-dark">{d.demoNote}</p>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Balance — teal highlight card */}
        <div className="surface-card col-span-1 overflow-hidden bg-gradient-to-br from-teal to-teal-dark text-white sm:col-span-2 xl:col-span-1">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{d.balance}</p>
              <Wallet size={18} className="text-white/50" />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">
              {formatDzd(data.balance, locale)}
            </p>
            <p className="mt-1 text-xs text-white/60">
              {formatDzd(data.inEscrow, locale)} en escrow
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
            >
              <ArrowUpRight size={13} />
              {d.withdraw}
            </button>
          </div>
        </div>

        {/* Active orders */}
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">{d.activeOrders}</p>
            <ShoppingBag size={18} className="text-teal" />
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-charcoal">{data.activeOrders}</p>
          <p className="mt-1 text-xs text-mid-gray">
            {data.pendingDelivery} {d.pendingDelivery}
          </p>
        </div>

        {/* Rating */}
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">{d.globalRating}</p>
            <Star size={18} className="text-teal" />
          </div>
          <div className="mt-3">
            <StarRating rating={data.rating} reviewCount={data.reviewCount} size="md" />
          </div>
        </div>

        {/* Completion rate */}
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">{d.completionRate}</p>
            <TrendingUp size={18} className="text-teal" />
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-charcoal">{data.completionRate}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-off-white">
            <div
              className="h-full rounded-full bg-teal"
              style={{ width: `${data.completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <section id="orders" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoal">{d.recentOrders}</h2>
          <span className="rounded-full bg-amber-light/60 px-2.5 py-0.5 text-xs font-semibold text-amber-dark">
            {data.orders.length} commandes
          </span>
        </div>
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-light-border bg-off-white/60 text-left text-xs font-semibold uppercase tracking-wide text-mid-gray">
                  <th className="px-5 py-3.5">{d.client}</th>
                  <th className="px-5 py-3.5">{d.service}</th>
                  <th className="px-5 py-3.5">{d.amount}</th>
                  <th className="px-5 py-3.5">{d.status}</th>
                  <th className="px-5 py-3.5">{d.date}</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-light-border/50 last:border-0 hover:bg-off-white/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={order.clientName} size="sm" className="!h-7 !w-7 !text-xs" />
                        <span className="font-medium text-charcoal">{order.clientName}</span>
                      </div>
                    </td>
                    <td className="max-w-[200px] px-5 py-4 text-dark-gray">
                      <span className="line-clamp-1">{order.service}</span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-teal">
                      {formatDzd(order.amountDzd, locale)}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-mid-gray">{order.date}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/freelancer/orders/${order.id}`}
                        className="text-xs font-medium text-teal hover:underline"
                      >
                        {t.common.view}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* My services */}
      <section id="services" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoal">{d.myServices}</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
          >
            <Plus size={14} />
            {d.newService}
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.services.map((s) => (
            <div key={s.id} className="surface-card-hover group p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-charcoal transition-colors group-hover:text-teal">
                  {s.title}
                </h3>
                <span className="shrink-0 rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-semibold text-teal-dark">
                  Actif
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-teal">{formatDzd(s.priceDzd, locale)}</p>
              <p className="mt-1 text-xs text-mid-gray">
                {s.orders} {t.freelancers.orders}
              </p>
              <div className="mt-3 h-1 w-full rounded-full bg-off-white">
                <div
                  className="h-full rounded-full bg-teal/60"
                  style={{ width: `${Math.min((s.orders / 30) * 100, 100)}%` }}
                />
              </div>
              <Link
                href={`/service/${s.id}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
              >
                {t.common.view} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
