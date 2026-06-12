"use client";

import Link from "next/link";
import {
  CheckCircle2, Wallet, Search,
  ArrowRight, Clock, Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { CLIENT_DEMO } from "@/lib/demo-data";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

const QUICK_LINKS = [
  { label: "Design graphique", href: "/freelancers?category=design_graphique", color: "bg-teal-wash text-teal-dark" },
  { label: "Développement web", href: "/freelancers?category=dev_web", color: "bg-amber-light/50 text-amber-dark" },
  { label: "Vidéo & Animation", href: "/freelancers?category=video_animation", color: "bg-purple-100 text-purple-700" },
  { label: "Rédaction", href: "/freelancers?category=redaction", color: "bg-blue-50 text-blue-700" },
];

export default function ClientDashboardPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard.client;
  const user = DEMO_USERS.client;
  const data = CLIENT_DEMO;

  const kpis = [
    {
      label: d.activeOrders,
      value: String(data.activeOrders),
      icon: Clock,
      sub: "en cours",
      accentClass: "text-amber-dark",
      bgClass: "bg-amber-light/20",
    },
    {
      label: d.completedOrders,
      value: String(data.completedOrders),
      icon: CheckCircle2,
      sub: "terminées",
      accentClass: "text-teal-dark",
      bgClass: "bg-teal-wash/60",
    },
    {
      label: d.totalSpent,
      value: formatDzd(data.totalSpent, locale),
      icon: Wallet,
      sub: "en DZD",
      accentClass: "text-charcoal",
      bgClass: "bg-off-white",
    },
  ];

  return (
    <DashboardShell
      role="client"
      userName={user.name}
      headerAction={
        <Link
          href="/freelancers"
          className="inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-dark transition-colors"
        >
          <Search size={15} />
          {d.browse}
        </Link>
      }
    >
      {/* Demo notice */}
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-light/30 border border-amber/10 px-4 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber/20 text-amber-dark">
          <Star size={14} />
        </div>
        <p className="text-sm text-amber-dark">{d.demoNote}</p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className={`surface-card p-5 ${kpi.bgClass}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">
                  {kpi.label}
                </p>
                <Icon size={18} className="text-teal" />
              </div>
              <p className={`mt-3 text-3xl font-bold tracking-tight ${kpi.accentClass}`}>
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-mid-gray">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Orders table */}
      <section id="orders" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoal">{d.recentOrders}</h2>
          <span className="rounded-full bg-off-white px-2.5 py-0.5 text-xs font-semibold text-mid-gray ring-1 ring-light-border">
            {data.orders.length} commandes
          </span>
        </div>
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-light-border bg-off-white/60 text-left text-xs font-semibold uppercase tracking-wide text-mid-gray">
                  <th className="px-5 py-3.5">{d.freelancer}</th>
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
                        <Avatar name={order.freelancerName} size="sm" className="!h-7 !w-7 !text-xs" />
                        <Link
                          href="/freelancer/yacine-bensalem"
                          className="font-medium text-charcoal hover:text-teal transition-colors"
                        >
                          {order.freelancerName}
                        </Link>
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
                        href={`/client/orders/${order.id}`}
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

      {/* Quick-find section */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-charcoal">Trouver un talent</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-sm ${link.color}`}
            >
              {link.label}
              <ArrowRight size={14} className="shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
