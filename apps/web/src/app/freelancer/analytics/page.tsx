"use client";

import { BarChart3, TrendingUp, Users, Star, ArrowUpRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

const MONTHLY_DATA = [
  { month: "Avr", revenue: 8500, orders: 4 },
  { month: "Mai", revenue: 14200, orders: 6 },
  { month: "Jun", revenue: 11800, orders: 5 },
  { month: "Jul", revenue: 18500, orders: 8 },
  { month: "Aou", revenue: 22000, orders: 10 },
  { month: "Sep", revenue: 19500, orders: 9 },
];

const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));

export default function FreelancerAnalyticsPage() {
  const user = DEMO_USERS.freelancer;
  const { locale } = useLocale();

  const totalRevenue = MONTHLY_DATA.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = MONTHLY_DATA.reduce((a, b) => a + b.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <DashboardShell role="freelancer" userName={user.name}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Analytiques</h1>
        <p className="mt-1 text-sm text-mid-gray">Vos performances des 6 derniers mois</p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Revenus totaux", value: formatDzd(totalRevenue, locale), icon: TrendingUp, color: "text-teal" },
          { label: "Commandes totales", value: String(totalOrders), icon: BarChart3, color: "text-blue-500" },
          { label: "Valeur moy. commande", value: formatDzd(avgOrderValue, locale), icon: ArrowUpRight, color: "text-amber-dark" },
          { label: "Note globale", value: "4.9 / 5", icon: Star, color: "text-amber" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="surface-card p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-mid-gray">{kpi.label}</p>
                <Icon size={18} className={kpi.color} />
              </div>
              <p className="text-2xl font-black text-charcoal">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <div className="surface-card p-6 mb-6">
        <h2 className="text-lg font-bold text-charcoal mb-6">Revenus par mois</h2>
        <div className="flex items-end gap-4 h-48">
          {MONTHLY_DATA.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-teal">{formatDzd(d.revenue, locale)}</p>
              <div className="w-full relative">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-teal-dark to-teal transition-all duration-500 hover:from-teal hover:to-teal-light"
                  style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                />
              </div>
              <p className="text-xs font-semibold text-mid-gray">{d.month}</p>
              <p className="text-[10px] text-mid-gray">{d.orders} cmd</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="surface-card p-6">
        <h2 className="text-lg font-bold text-charcoal mb-5">Repartition par service</h2>
        <div className="space-y-4">
          {[
            { service: "Logo professionnel", percent: 60, revenue: formatDzd(totalRevenue * 0.6, locale) },
            { service: "Carte de visite", percent: 30, revenue: formatDzd(totalRevenue * 0.3, locale) },
            { service: "Autres", percent: 10, revenue: formatDzd(totalRevenue * 0.1, locale) },
          ].map((item) => (
            <div key={item.service}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold text-charcoal">{item.service}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-bold text-teal">{item.revenue}</p>
                  <p className="text-xs text-mid-gray w-8 text-right">{item.percent}%</p>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-off-white">
                <div
                  className="h-full rounded-full bg-teal transition-all duration-700"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
