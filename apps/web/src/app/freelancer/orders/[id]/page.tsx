"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, UploadCloud, CheckCircle2, MessageSquare } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatDzd } from "@/lib/api";

export default function FreelancerOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { locale } = useLocale();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [fileUrls, setFileUrls] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchOrder = () => {
    fetch(`http://localhost:4000/api/v1/orders/${id}`, {
      headers: { "x-user-id": "f1", "x-user-role": "FREELANCER" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOrder(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleDeliver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrls) {
      alert("Veuillez fournir au moins un lien vers vos fichiers (ex: Google Drive, WeTransfer).");
      return;
    }
    
    setSubmitting(true);
    try {
      await fetch(`http://localhost:4000/api/v1/orders/${id}/deliver`, {
        method: "POST",
        headers: { "x-user-id": "f1", "x-user-role": "FREELANCER", "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrls: [fileUrls], message })
      });
      fetchOrder();
    } catch (err) {
      alert("Erreur lors de la livraison.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <DashboardShell role="freelancer" userName="Yacine"><div className="py-20 text-center">Chargement...</div></DashboardShell>;
  }

  if (!order) {
    return (
      <DashboardShell role="freelancer" userName="Yacine">
        <div className="py-20 text-center">
          <p className="text-mid-gray">Commande introuvable.</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="freelancer" userName="Yacine">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/freelancer/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-mid-gray hover:text-teal transition-colors">
          <ArrowLeft size={15} />
          Tableau de bord
        </Link>
        <span className="text-light-border">/</span>
        <span className="text-sm font-medium text-charcoal">Commande #{order.id}</span>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          
          <div className="surface-card p-6">
            <h2 className="mb-3 text-lg font-semibold text-charcoal">Brief du client</h2>
            <div className="rounded-xl bg-teal-wash/40 p-4">
              <p className="text-sm leading-relaxed text-dark-gray">{order.brief?.text || order.brief}</p>
            </div>
          </div>

          {order.status === "ACTIVE" && (
            <form onSubmit={handleDeliver} className="surface-card p-6 border border-teal/20">
              <h2 className="mb-4 text-lg font-semibold text-charcoal flex items-center gap-2">
                <UploadCloud className="text-teal" size={20} />
                Livrer la commande
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark-gray mb-2">Liens vers les fichiers (Google Drive, etc.) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={fileUrls}
                  onChange={(e) => setFileUrls(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-teal focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-gray mb-2">Message pour le client (Optionnel)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bonjour, voici les fichiers finaux..."
                  className="w-full rounded-lg border border-light-border p-3 text-sm min-h-[100px] focus:border-teal focus:outline-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" loading={submitting} icon={<UploadCloud size={16} />}>
                Soumettre la livraison
              </Button>
            </form>
          )}

          {order.status === "DELIVERED" && (
            <div className="surface-card p-6 bg-teal-wash/30 border-l-4 border-teal">
              <h3 className="text-lg font-semibold text-teal-dark mb-2">En attente de confirmation</h3>
              <p className="text-sm text-dark-gray">Vous avez livré cette commande. Le client dispose de 72h pour confirmer ou demander une révision.</p>
            </div>
          )}

          {order.status === "COMPLETED" && (
            <div className="surface-card p-6 bg-green-50 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <CheckCircle2 size={20} /> Commande terminée
              </h3>
              <p className="text-sm text-green-700/80 mt-2">Le paiement de {formatDzd((order.priceDzd || order.amountDzd) * 0.9, locale)} a été crédité sur votre portefeuille (après déduction de 10% de commission).</p>
            </div>
          )}

        </div>

        <div className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="font-semibold text-charcoal mb-4">Informations</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mid-gray">Date de livraison max</span>
                <span className="font-medium text-charcoal">{new Date(order.deliveryDeadline || order.deadline).toLocaleDateString(locale)}</span>
              </div>
              <div className="flex justify-between border-t border-light-border pt-3">
                <span className="text-mid-gray">Prix total</span>
                <span className="font-medium text-charcoal">{formatDzd(order.priceDzd || order.amountDzd, locale)}</span>
              </div>
              <div className="flex justify-between text-teal-dark">
                <span className="text-mid-gray">Vos revenus (net)</span>
                <span className="font-bold">{formatDzd((order.priceDzd || order.amountDzd) * 0.9, locale)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
