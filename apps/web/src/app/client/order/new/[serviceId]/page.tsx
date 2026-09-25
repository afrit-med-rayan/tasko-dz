"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/Button";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { formatDzd } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { ArrowLeft, UploadCloud, Smartphone } from "lucide-react";
import Link from "next/link";

export default function NewOrderPage() {
  const router = useRouter();
  const params = useParams();
  const { locale } = useLocale();
  const serviceId = params.serviceId as string;

  const [service, setService] = useState<any>(null);
  const [brief, setBrief] = useState("");
  const [deadline, setDeadline] = useState("72h");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [briefTouched, setBriefTouched] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/demo/services/${serviceId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setService)
      .catch(() => {
        // Fallback for mock if demo endpoint doesn't exist yet
        // In a real app we'd handle 404 properly
        setService({
          id: serviceId,
          title: "Service Test",
          priceDzd: 5000,
          freelancer: { name: "Yacine Bensalem" }
        });
      });
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBriefTouched(true);
    if (brief.trim().length < 50) {
      setError("Le brief doit contenir au moins 50 caractères pour être validé.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/v1/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "c1",
          "x-user-role": "CLIENT"
        },
        body: JSON.stringify({
          serviceId,
          brief: {
            text: brief,
            attachments: []
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de création de commande");

      // Redirect to mock payment page or directly to order tracking
      router.push(`/client/orders/${data.orderId}?payment=success`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!service) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <DashboardShell role="client" userName="Nadia">
      <div className="mx-auto max-w-3xl">
        <Link href={`/service/${serviceId}`} className="mb-6 inline-flex items-center gap-2 text-sm text-mid-gray hover:text-teal transition-colors">
          <ArrowLeft size={16} />
          Retour au service
        </Link>
        
        <h1 className="text-2xl font-bold text-charcoal mb-6">Passer commande</h1>
        
        <div className="surface-card mb-6 p-5 bg-off-white/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-mid-gray mb-1">Service commandé à {service.freelancer?.name}</p>
              <h3 className="font-semibold text-charcoal">{service.title}</h3>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-teal">{formatDzd(service.priceDzd || 0, locale)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="surface-card p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Brief du projet</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Description détaillée <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-mid-gray mb-3">
              Expliquez exactement ce que vous attendez du freelancer. Soyez le plus précis possible.
            </p>
            <textarea
              className={`w-full rounded-xl border p-4 text-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors ${
                briefTouched && brief.trim().length < 50 ? "border-danger focus:border-danger" : "border-light-border focus:border-teal"
              }`}
              placeholder="Ex: J'ai besoin d'un logo pour ma nouvelle marque de vêtements..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              onBlur={() => setBriefTouched(true)}
            />
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className={briefTouched && brief.trim().length < 50 ? "text-danger" : "text-mid-gray"}>
                {briefTouched && brief.trim().length < 50 ? "Minimum 50 caractères requis." : "Soyez le plus détaillé possible."}
              </span>
              <span className={brief.trim().length < 50 ? "text-amber-dark" : "text-teal"}>
                {brief.trim().length} / 50 min
              </span>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Délai souhaité <span className="text-red-500">*</span>
              </label>
              <select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-light-border h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-colors"
              >
                <option value="24h">24 heures</option>
                <option value="48h">48 heures</option>
                <option value="72h">72 heures</option>
                <option value="1semaine">1 semaine</option>
                <option value="personnalise">Date personnalisée</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Budget convenu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={service.priceDzd}
                  readOnly
                  className="w-full rounded-xl border border-light-border h-12 px-4 text-sm bg-off-white/60 text-mid-gray cursor-not-allowed"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-mid-gray">
                  DZD
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-mid-gray">Prix fixe du service. Non négociable pour ce service.</p>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Fichiers de référence (Optionnel)
            </label>
            <div className="border-2 border-dashed border-light-border rounded-xl p-8 text-center hover:bg-off-white/50 transition-colors cursor-pointer">
              <UploadCloud className="mx-auto mb-3 text-mid-gray" size={24} />
              <p className="text-sm font-medium text-charcoal">Glissez-déposez vos fichiers ici</p>
              <p className="text-xs text-mid-gray mt-1">Images, PDF, ZIP. Max 10MB.</p>
            </div>
          </div>

          <EscrowNotice amount={service.priceDzd || 0} />

          <div className="mt-8 border-t border-light-border pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-charcoal">Total à payer</span>
              <span className="text-2xl font-bold text-charcoal">{formatDzd(service.priceDzd || 0, locale)}</span>
            </div>
            
            <Button
              type="submit"
              variant="amber"
              className="w-full h-14 text-base shadow-md"
              loading={loading}
              disabled={loading || brief.trim().length < 50}
              icon={<Smartphone size={20} />}
            >
              Payer via BaridiMob
            </Button>
            <div className="text-center mt-4">
              <button type="button" className="text-sm text-teal font-medium hover:underline">
                Ou payer par carte CIB
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
