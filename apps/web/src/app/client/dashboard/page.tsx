"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import {
  CheckCircle2, Wallet, Search,
  ArrowRight, Clock, Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
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
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/orders", {
      headers: { "x-user-id": "c1", "x-user-role": "CLIENT" }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      });
  }, []);

  const activeOrders = orders.filter(o => o.status !== "COMPLETED" && o.status !== "CANCELLED" && o.status !== "PENDING_PAYMENT").length;
  const completedOrders = orders.filter(o => o.status === "COMPLETED").length;
  const totalSpent = orders.filter(o => o.status === "COMPLETED").reduce((acc, o) => acc + (o.priceDzd || o.amountDzd || 0), 0);

  const kpis = [
    {
      label: d.activeOrders,
      value: String(activeOrders),
      icon: Clock,
      sub: "en cours",
      accentClass: "text-amber-dark",
      bgClass: "bg-amber-light/20",
    },
    {
      label: d.completedOrders,
      value: String(completedOrders),
      icon: CheckCircle2,
      sub: "terminées",
      accentClass: "text-teal-dark",
      bgClass: "bg-teal-wash/60",
    },
    {
      label: d.totalSpent,
      value: formatDzd(totalSpent, locale),
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
      <div className="grid gap-5 sm:grid-cols-3 mb-10">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className={`surface-card p-6 border-b-4 border-b-transparent hover:border-b-teal transition-all ${kpi.bgClass}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-white shadow-sm shrink-0 ${kpi.accentClass}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-mid-gray mb-1">
                    {kpi.label}
                  </p>
                  <div className="flex items-end gap-2">
                    <p className={`text-3xl font-black tracking-tight ${kpi.accentClass}`}>
                      {kpi.value}
                    </p>
                    <span className="mb-1 text-xs font-medium text-mid-gray">{kpi.sub}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders table */}
      <section id="orders" className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-charcoal">{d.recentOrders}</h2>
          <span className="rounded-full bg-off-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-mid-gray ring-1 ring-light-border/50">
            {orders.length} commandes
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
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-mid-gray">Chargement...</td></tr>
                ) : orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-light-border/50 last:border-0 hover:bg-off-white/60 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={order.freelancerName || "Yacine Bensalem"} size="sm" className="shadow-sm" />
                        <Link
                          href="/freelancer/yacine-bensalem"
                          className="font-semibold text-charcoal hover:text-teal transition-colors"
                        >
                          {order.freelancerName || "Yacine Bensalem"}
                        </Link>
                      </div>
                    </td>
                    <td className="max-w-[200px] px-5 py-4 text-dark-gray font-medium">
                      <span className="line-clamp-1">{order.serviceId || order.service}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-teal bg-teal-wash/50 px-2 py-1 rounded-md">
                        {formatDzd(order.priceDzd || order.amountDzd || 0, locale)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-mid-gray text-xs font-medium">{new Date(order.createdAt || order.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric'})}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/client/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal bg-teal-wash px-3 py-1.5 rounded-lg hover:bg-teal hover:text-white transition-all"
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
      <section className="mt-12 mb-8">
        <h2 className="mb-6 text-xl font-bold text-charcoal">Trouver un talent</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex flex-col items-start justify-between rounded-2xl p-5 text-sm font-semibold transition-all hover:-translate-y-1 hover:shadow-md ${link.color}`}
            >
              <span className="mb-4">{link.label}</span>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight size={16} className="shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
