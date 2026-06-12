"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowDownLeft, ArrowUpRight,
  Wallet, Clock, CheckCircle2, AlertCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

const WALLET = {
  available: 28500,
  inEscrow: 12000,
  thisMonth: 14500,
  lifetimeEarned: 87500,
};

const TRANSACTIONS = [
  {
    id: "t1",
    type: "FREELANCER_CREDIT" as const,
    label: "Logo professionnel — Sonia B.",
    amount: 3150,
    direction: "CREDIT" as const,
    date: "2026-06-05",
    orderId: "o3",
  },
  {
    id: "t2",
    type: "FREELANCER_CREDIT" as const,
    label: "Carte de visite — Karim M.",
    amount: 2250,
    direction: "CREDIT" as const,
    date: "2026-06-01",
    orderId: "o2",
  },
  {
    id: "t3",
    type: "WITHDRAWAL" as const,
    label: "Virement BaridiMob",
    amount: 10000,
    direction: "DEBIT" as const,
    date: "2026-05-28",
    orderId: null,
  },
  {
    id: "t4",
    type: "FREELANCER_CREDIT" as const,
    label: "Identité visuelle — Nadia K.",
    amount: 5400,
    direction: "CREDIT" as const,
    date: "2026-05-20",
    orderId: null,
  },
  {
    id: "t5",
    type: "FREELANCER_CREDIT" as const,
    label: "Logo startups — Mehdi A.",
    amount: 3150,
    direction: "CREDIT" as const,
    date: "2026-05-14",
    orderId: null,
  },
  {
    id: "t6",
    type: "WITHDRAWAL" as const,
    label: "Virement BaridiMob",
    amount: 8000,
    direction: "DEBIT" as const,
    date: "2026-05-08",
    orderId: null,
  },
];

const PENDING_ESCROW = [
  { orderId: "o1", client: "Nadia Khelifi", service: "Logo professionnel", amount: 3500, net: 3150, autoConfirmDate: "2026-06-12" },
  { orderId: "o2", client: "Karim M.", service: "Carte de visite", amount: 2500, net: 2250, autoConfirmDate: "2026-06-10" },
];

const TYPE_LABELS: Record<string, string> = {
  FREELANCER_CREDIT: "Gain",
  WITHDRAWAL: "Virement",
  COMMISSION: "Commission",
  ESCROW_LOCK: "Escrow",
  ESCROW_RELEASE: "Libération",
  REFUND: "Remboursement",
};

export default function FreelancerWalletPage() {
  const { locale } = useLocale();
  const user = DEMO_USERS.freelancer;

  return (
    <DashboardShell role="freelancer" userName={user.name}>
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/freelancer/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-mid-gray hover:text-teal transition-colors"
        >
          <ArrowLeft size={15} />
          Tableau de bord
        </Link>
      </div>

      {/* Hero wallet card */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-teal to-teal-dark text-white shadow-elevated">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                Solde disponible
              </p>
              <p className="mt-2 text-5xl font-bold tracking-tight">
                {formatDzd(WALLET.available, locale)}
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Wallet size={28} strokeWidth={1.5} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "En escrow", value: formatDzd(WALLET.inEscrow, locale) },
              { label: "Ce mois", value: formatDzd(WALLET.thisMonth, locale) },
              { label: "Lifetime", value: formatDzd(WALLET.lifetimeEarned, locale) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-white/10 px-3 py-3 text-center">
                <p className="text-xs text-white/60">{label}</p>
                <p className="mt-0.5 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-dark transition-colors"
          >
            <ArrowUpRight size={16} />
            Virer vers BaridiMob
          </button>
          <p className="mt-2 text-xs text-white/50">Minimum 1 000 DZD · Traitement sous 24h</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Transaction history */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Historique des transactions</h2>
            <button
              type="button"
              className="text-xs font-medium text-teal hover:underline"
            >
              Exporter CSV
            </button>
          </div>
          <div className="surface-card overflow-hidden">
            {TRANSACTIONS.map((tx, i) => (
              <div
                key={tx.id}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < TRANSACTIONS.length - 1 ? "border-b border-light-border/50" : ""
                } hover:bg-off-white/40 transition-colors`}
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    tx.direction === "CREDIT"
                      ? "bg-success/60 text-success-dark"
                      : "bg-off-white text-mid-gray"
                  }`}
                >
                  {tx.direction === "CREDIT"
                    ? <ArrowDownLeft size={18} />
                    : <ArrowUpRight size={18} />}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-charcoal line-clamp-1">{tx.label}</p>
                  <p className="mt-0.5 text-xs text-mid-gray">
                    {TYPE_LABELS[tx.type]} · {tx.date}
                  </p>
                </div>

                {/* Amount */}
                <p
                  className={`text-sm font-bold ${
                    tx.direction === "CREDIT" ? "text-success-dark" : "text-charcoal"
                  }`}
                >
                  {tx.direction === "CREDIT" ? "+" : "-"}
                  {formatDzd(tx.amount, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pending escrow */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-charcoal">En attente (escrow)</h2>
          <div className="space-y-3">
            {PENDING_ESCROW.map((item) => (
              <div key={item.orderId} className="surface-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal line-clamp-1">{item.service}</p>
                    <p className="mt-0.5 text-xs text-mid-gray">{item.client}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-light/50 px-2 py-0.5 text-[10px] font-semibold text-amber-dark">
                    En attente
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-teal">{formatDzd(item.net, locale)}</span>
                  <span className="text-xs text-mid-gray line-through">
                    {formatDzd(item.amount, locale)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-mid-gray">
                  <Clock size={11} />
                  Auto-confirmation le {item.autoConfirmDate}
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="rounded-xl bg-teal-wash/50 p-4 text-sm">
              <div className="flex items-center gap-2 text-teal-dark">
                <CheckCircle2 size={14} />
                <span className="font-semibold">Total en escrow</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-teal-dark">
                {formatDzd(WALLET.inEscrow, locale)}
              </p>
              <p className="mt-0.5 text-xs text-teal-dark/70">
                Libéré après confirmation client
              </p>
            </div>

            {/* Withdrawal info */}
            <div className="flex items-start gap-2.5 rounded-xl bg-off-white px-4 py-3 text-xs text-mid-gray ring-1 ring-light-border">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              Les virements sont traités sous 24h ouvrées. Commission déduite à la libération de l&apos;escrow.
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
