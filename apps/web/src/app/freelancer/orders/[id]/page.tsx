"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft, Upload, MessageCircle, CheckCircle2,
  Clock, AlertCircle, FileText, X,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";
import type { OrderStatus } from "@/lib/demo-data";

const MOCK_ORDERS: Record<string, {
  id: string;
  service: string;
  clientName: string;
  amountDzd: number;
  status: OrderStatus;
  date: string;
  brief: string;
  deadline: string;
  commission: number;
}> = {
  o1: {
    id: "o1",
    service: "Logo professionnel + fichiers sources",
    clientName: "Nadia Khelifi",
    amountDzd: 3500,
    status: "ACTIVE",
    date: "2026-06-08",
    brief:
      "Logo pour ma boutique de vêtements. Couleurs préférées: vert et blanc. Style moderne et minimaliste. Je veux quelque chose de propre et élégant qui reflète la mode algérienne contemporaine.",
    deadline: "2026-06-11",
    commission: 350,
  },
  o2: {
    id: "o2",
    service: "Carte de visite + papeterie",
    clientName: "Karim M.",
    amountDzd: 2500,
    status: "DELIVERED",
    date: "2026-06-05",
    brief: "Carte de visite pour mon cabinet médical. Couleurs bleues et blanches, style médical professionnel.",
    deadline: "2026-06-07",
    commission: 250,
  },
  o3: {
    id: "o3",
    service: "Logo professionnel + fichiers sources",
    clientName: "Sonia B.",
    amountDzd: 3500,
    status: "COMPLETED",
    date: "2026-05-28",
    brief: "Logo pour une startup tech algérienne. Style moderne, couleurs vives.",
    deadline: "2026-05-31",
    commission: 350,
  },
};

const DEADLINE_STATUS = (deadline: string) => {
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: `En retard de ${Math.abs(diff)} jour(s)`, color: "text-danger bg-red-50" };
  if (diff === 0) return { label: "Délai aujourd'hui!", color: "text-amber-dark bg-amber-light/30" };
  if (diff <= 1) return { label: `${diff} jour restant`, color: "text-amber-dark bg-amber-light/30" };
  return { label: `${diff} jours restants`, color: "text-teal-dark bg-teal-wash/60" };
};

export default function FreelancerOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locale } = useLocale();
  const order = MOCK_ORDERS[id];

  if (!order) {
    return (
      <DashboardShell role="freelancer" userName={DEMO_USERS.freelancer.name}>
        <div className="py-20 text-center">
          <p className="text-mid-gray">Commande introuvable.</p>
          <Link href="/freelancer/dashboard" className="mt-4 inline-block text-sm text-teal hover:underline">
            ← Retour au tableau de bord
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const deadline = DEADLINE_STATUS(order.deadline);
  const netEarnings = order.amountDzd - order.commission;

  return (
    <DashboardShell role="freelancer" userName={DEMO_USERS.freelancer.name}>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/freelancer/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-mid-gray hover:text-teal transition-colors"
        >
          <ArrowLeft size={15} />
          Tableau de bord
        </Link>
        <span className="text-light-border">/</span>
        <span className="text-sm font-medium text-charcoal">Commande #{order.id}</span>
        <OrderStatusBadge status={order.status} />
      </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            {/* Client brief */}
            <div className="surface-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-charcoal">Brief du client</h2>
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${deadline.color}`}>
                  <Clock size={12} />
                  {deadline.label}
                </div>
              </div>
              <div className="rounded-xl bg-teal-wash/40 p-4">
                <p className="text-sm leading-relaxed text-dark-gray">{order.brief}</p>
              </div>
            </div>

            {/* Delivery area */}
            {(order.status === "ACTIVE" || order.status === "DELIVERED") && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-charcoal">
                  {order.status === "DELIVERED" ? "Fichiers livrés" : "Livrer la commande"}
                </h2>

                {order.status === "ACTIVE" && (
                  <>
                    {/* Upload zone */}
                    <div className="rounded-xl border-2 border-dashed border-light-border bg-off-white/50 p-8 text-center hover:border-teal/40 hover:bg-teal-wash/20 transition-colors cursor-pointer">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-mid-gray shadow-sm">
                        <Upload size={24} strokeWidth={1.5} />
                      </div>
                      <p className="mt-3 font-medium text-charcoal">Glisser-déposer ou cliquer pour choisir</p>
                      <p className="mt-1 text-xs text-mid-gray">Images, PDF, AI, PSD, ZIP — max 50 MB</p>
                      <button
                        type="button"
                        className="mt-4 rounded-lg border border-light-border bg-white px-4 py-2 text-sm font-medium text-dark-gray hover:border-teal hover:text-teal transition-colors"
                      >
                        Choisir les fichiers
                      </button>
                    </div>

                    {/* Delivery message */}
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-charcoal">
                        Message (optionnel)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Bonjour! Voici le logo final avec tous les fichiers sources..."
                        className="w-full rounded-xl border border-light-border bg-white px-4 py-3 text-sm text-dark-gray outline-none transition-all placeholder:text-mid-gray focus:border-teal focus:ring-2 focus:ring-teal/15"
                      />
                    </div>

                    <Button variant="primary" className="mt-4 gap-2" disabled>
                      <CheckCircle2 size={16} />
                      Livrer la commande
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                        Ajoutez un fichier
                      </span>
                    </Button>
                  </>
                )}

                {order.status === "DELIVERED" && (
                  <div className="rounded-xl bg-teal-wash/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-teal-dark">
                      <CheckCircle2 size={16} />
                      Livraison envoyée — en attente de confirmation du client
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Completed state */}
            {order.status === "COMPLETED" && (
              <div className="surface-card border-success/30 bg-success/50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-dark/10 text-success-dark">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-success-dark">Commande complétée ✓</h2>
                    <p className="mt-0.5 text-sm text-success-dark/70">
                      {formatDzd(netEarnings, locale)} ont été crédités sur votre portefeuille.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Cancel link */}
            {order.status === "ACTIVE" && (
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-mid-gray hover:text-danger transition-colors"
              >
                <X size={14} />
                Annuler la commande
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Earnings card */}
            <div className="surface-card overflow-hidden">
              <div className="bg-gradient-to-br from-teal to-teal-dark p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  Vos gains
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {formatDzd(netEarnings, locale)}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Après commission Tasko (10%)
                </p>
              </div>
              <div className="p-4 text-sm">
                <div className="flex justify-between text-mid-gray">
                  <span>Prix du service</span>
                  <span>{formatDzd(order.amountDzd, locale)}</span>
                </div>
                <div className="mt-1.5 flex justify-between text-mid-gray">
                  <span>Commission Tasko (10%)</span>
                  <span className="text-danger">-{formatDzd(order.commission, locale)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-light-border/60 pt-2 font-semibold text-charcoal">
                  <span>Net</span>
                  <span className="text-teal">{formatDzd(netEarnings, locale)}</span>
                </div>
              </div>
            </div>

            {/* Client card */}
            <div className="surface-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mid-gray">Client</p>
              <div className="flex items-center gap-3">
                <Avatar name={order.clientName} size="md" />
                <div>
                  <p className="font-semibold text-charcoal">{order.clientName}</p>
                  <p className="mt-0.5 text-xs text-mid-gray">Client Tasko</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-light-border bg-white py-2.5 text-sm font-medium text-dark-gray hover:border-teal hover:text-teal transition-colors"
              >
                <MessageCircle size={15} />
                Chat avec le client
              </button>
            </div>

            {/* Order info */}
            <div className="surface-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mid-gray">Détails</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-mid-gray">Commande</span>
                  <span className="font-medium text-charcoal">#{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">Date</span>
                  <span className="font-medium text-charcoal">{order.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">Délai</span>
                  <span className="font-medium text-charcoal">{order.deadline}</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="flex items-start gap-2.5 rounded-xl bg-off-white px-4 py-3 text-xs text-mid-gray ring-1 ring-light-border">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              Respectez le brief et communiquez régulièrement pour éviter les litiges.
            </div>

            {/* Brief file icon */}
            <Link
              href={`/freelancer/dashboard`}
              className="flex items-center gap-2.5 rounded-xl border border-light-border bg-white px-4 py-3 text-sm font-medium text-dark-gray hover:border-teal hover:text-teal transition-colors"
            >
              <FileText size={15} className="text-teal" />
              Voir toutes les commandes
            </Link>
          </div>
        </div>
    </DashboardShell>
  );
}
