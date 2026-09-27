"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Clock, RotateCcw, AlertTriangle,
  MessageCircle, Shield, Download,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

type OrderStatus = "PENDING_PAYMENT" | "ACTIVE" | "DELIVERED" | "REVISION" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "DISPUTE_RESOLVED";

const TIMELINE_STEPS: { key: OrderStatus | "BRIEF"; label: string }[] = [
  { key: "BRIEF", label: "Brief soumis" },
  { key: "PENDING_PAYMENT", label: "Paiement confirmé" },
  { key: "ACTIVE", label: "En cours" },
  { key: "DELIVERED", label: "Livré" },
  { key: "COMPLETED", label: "Complété" },
];

const STATUS_ORDER: Record<string, number> = {
  BRIEF: 0,
  PENDING_PAYMENT: 1,
  ACTIVE: 2,
  DELIVERED: 3,
  COMPLETED: 4,
};

export default function ClientOrderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const { locale } = useLocale();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    fetch(`http://localhost:4000/api/v1/orders/${id}`, {
      headers: { "x-user-id": "c1", "x-user-role": "CLIENT" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOrder(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      fetch(`http://localhost:4000/api/v1/orders/${id}/payment-success`, {
        method: "POST",
        headers: { "x-user-id": "c1", "x-user-role": "CLIENT" }
      }).then(() => fetchOrder());
    } else {
      fetchOrder();
    }
  }, [id, searchParams]);

  const handleConfirmDelivery = async () => {
    if (!confirm("Confirmer la livraison et libérer le paiement ?")) return;
    try {
      await fetch(`http://localhost:4000/api/v1/orders/${id}/confirm`, {
        method: "POST",
        headers: { "x-user-id": "c1", "x-user-role": "CLIENT" }
      });
      fetchOrder();
    } catch(e) {}
  };

  const handleDispute = async () => {
    const reason = prompt("Raison du litige :");
    if (!reason) return;
    try {
      await fetch(`http://localhost:4000/api/v1/orders/${id}/dispute`, {
        method: "POST",
        headers: { "x-user-id": "c1", "x-user-role": "CLIENT", "Content-Type": "application/json" },
        body: JSON.stringify({ reason })
      });
      fetchOrder();
    } catch(e) {}
  };

  if (loading) {
    return <DashboardShell role="client" userName="Nadia"><div className="py-20 text-center">Chargement...</div></DashboardShell>;
  }

  if (!order) {
    return (
      <DashboardShell role="client" userName={DEMO_USERS.client.name}>
        <div className="py-20 text-center">
          <p className="text-mid-gray">Commande introuvable.</p>
          <Link href="/client/dashboard" className="mt-4 inline-block text-sm text-teal hover:underline">
            ← Retour au tableau de bord
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const currentStep = STATUS_ORDER[order.status] ?? 0;

  return (
    <DashboardShell role="client" userName={DEMO_USERS.client.name}>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/client/dashboard"
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
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Timeline stepper */}
            <div className="surface-card p-6">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-mid-gray">
                Progression
              </h2>
              <div className="relative flex items-start justify-between">
                <div className="absolute left-0 right-0 top-4 h-0.5 bg-light-border" />
                <div
                  className="absolute left-0 top-4 h-0.5 bg-teal transition-all duration-500"
                  style={{ width: `${(currentStep / (TIMELINE_STEPS.length - 1)) * 100}%` }}
                />
                {TIMELINE_STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  const active = i === currentStep;
                  return (
                    <div key={step.key} className="relative flex flex-col items-center gap-2 text-center">
                      <div
                        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                          done
                            ? "border-teal bg-teal text-white"
                            : "border-light-border bg-white text-mid-gray"
                        } ${active ? "ring-4 ring-teal/20" : ""}`}
                      >
                        {done ? <CheckCircle2 size={14} strokeWidth={2.5} /> : <span className="text-xs font-bold">{i + 1}</span>}
                      </div>
                      <span className={`max-w-[72px] text-[11px] font-medium leading-tight ${done ? "text-teal-dark" : "text-mid-gray"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brief */}
            <div className="surface-card p-6">
              <h2 className="mb-3 text-lg font-semibold text-charcoal">Brief du projet</h2>
              <div className="rounded-xl bg-teal-wash/40 p-4">
                <p className="text-sm leading-relaxed text-dark-gray">{order.brief?.text || order.brief}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-mid-gray">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-teal" />
                  Délai: {new Date(order.deliveryDeadline || order.deadline).toLocaleDateString(locale)}
                </span>
              </div>
            </div>

            {/* Delivery files (if delivered/completed) */}
            {order.deliveryFiles && order.deliveryFiles.length > 0 && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-charcoal">Fichiers livrés</h2>
                <div className="space-y-3">
                  {order.deliveryFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between rounded-xl border border-light-border/60 bg-off-white/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-wash text-teal">
                          <Download size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{file.name}</p>
                          <p className="text-xs text-mid-gray">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-dark transition-colors"
                      >
                        Télécharger
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {(order.status === "DELIVERED") && (
              <div className="surface-card border-teal/20 bg-teal-wash/20 p-6">
                <h2 className="mb-2 text-lg font-semibold text-charcoal">Livraison reçue</h2>
                <p className="mb-5 text-sm text-mid-gray">
                  Vérifiez les fichiers livrés et confirmez si tout est correct.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" className="flex items-center gap-2" onClick={handleConfirmDelivery}>
                    <CheckCircle2 size={16} />
                    Confirmer la livraison
                  </Button>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <RotateCcw size={16} />
                    Demander une révision
                  </Button>
                </div>
              </div>
            )}

            {/* Open dispute */}
            {(order.status === "ACTIVE" || order.status === "DELIVERED") && (
              <button
                type="button"
                onClick={handleDispute}
                className="flex items-center gap-2 text-sm text-mid-gray hover:text-danger transition-colors"
              >
                <AlertTriangle size={14} />
                Signaler un problème / Ouvrir un litige
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Escrow status */}
            <div className="surface-card p-5">
              <EscrowNotice
                title="Escrow sécurisé"
                amount={formatDzd(order.priceDzd || order.amountDzd, locale)}
                subtitle={
                  order.status === "COMPLETED"
                    ? "Fonds libérés au freelancer"
                    : "Fonds bloqués jusqu'à confirmation"
                }
              />
            </div>

            {/* Freelancer card */}
            <div className="surface-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mid-gray">Freelancer</p>
              <div className="flex items-center gap-3">
                <Avatar name={order.freelancerName} size="md" />
                <div>
                  <Link
                    href={`/freelancer/${order.freelancerUsername}`}
                    className="font-semibold text-charcoal hover:text-teal transition-colors"
                  >
                    {order.freelancerName}
                  </Link>
                  <p className="mt-0.5 text-xs text-mid-gray">{order.service}</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-light-border bg-white py-2.5 text-sm font-medium text-dark-gray hover:border-teal hover:text-teal transition-colors"
              >
                <MessageCircle size={15} />
                Envoyer un message
              </button>
            </div>

            {/* Order summary */}
            <div className="surface-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mid-gray">Récapitulatif</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-mid-gray">Service</span>
                  <span className="font-medium text-charcoal text-right max-w-[160px] line-clamp-1">{order.serviceId || order.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">Date commande</span>
                  <span className="font-medium text-charcoal">{new Date(order.createdAt || order.date).toLocaleDateString(locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">Délai</span>
                  <span className="font-medium text-charcoal">{new Date(order.deliveryDeadline || order.deadline).toLocaleDateString(locale)}</span>
                </div>
                <div className="flex justify-between border-t border-light-border/60 pt-2.5">
                  <span className="text-mid-gray">Frais plateforme</span>
                  <span className="font-medium text-teal">Gratuit</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal">Total payé</span>
                  <span className="font-bold text-teal text-base">{formatDzd(order.priceDzd || order.amountDzd, locale)}</span>
                </div>
              </div>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2.5 rounded-xl bg-teal-wash/50 px-4 py-3 text-xs text-teal-dark">
              <Shield size={14} className="shrink-0" />
              Votre paiement est protégé par l&apos;escrow Tasko jusqu&apos;à confirmation de livraison.
            </div>
          </div>
        </div>
    </DashboardShell>
  );
}
