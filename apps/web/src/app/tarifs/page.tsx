"use client";

import Link from "next/link";
import { Check, ArrowRight, Shield, Users, Banknote, Zap } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const COMPARISON = [
  { platform: "Upwork", commission: "20%", dzd: "Non", escrow: "Oui", local: "Non" },
  { platform: "Fiverr", commission: "20%", dzd: "Non", escrow: "Oui", local: "Non" },
  { platform: "Instagram/DM", commission: "0%", dzd: "Oui", escrow: "Non", local: "Oui" },
  { platform: "Tasko ✓", commission: "10%", dzd: "Oui", escrow: "Oui", local: "Oui", highlight: true },
];

export default function PricingPage() {
  const { t } = useLocale();

  return (
    <PageShell>
      {/* Hero */}
      <div className="bg-gradient-to-b from-teal-wash/60 to-off-white">
        <div className="container-page py-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal-dark">
            <Shield size={14} />
            Transparent par design
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
            {t.pricing.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-mid-gray">
            {t.pricing.desc}
          </p>
        </div>
      </div>

      <div className="container-page pb-20">
        {/* Pricing cards */}
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Client card */}
          <div className="surface-card overflow-hidden">
            <div className="bg-off-white/60 px-8 py-6 border-b border-light-border/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-mid-gray shadow-sm">
                <Users size={22} strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-charcoal">{t.pricing.clientFee}</h2>
              <p className="mt-1 text-sm text-mid-gray">{t.pricing.clientFeeHint}</p>
            </div>
            <div className="px-8 py-6">
              <div className="flex items-end gap-2">
                <span className="text-6xl font-bold tracking-tight text-teal">
                  {t.pricing.clientFeeValue}
                </span>
              </div>
              <p className="mt-1 text-sm text-mid-gray">Aucun frais caché, jamais</p>
              <ul className="mt-6 space-y-3">
                {["Payer en DZD", "Escrow sur chaque commande", "Accès à tous les freelancers"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-dark-gray">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Freelancer card */}
          <div className="surface-card overflow-hidden ring-2 ring-teal/20">
            <div className="bg-gradient-to-br from-teal to-teal-dark px-8 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <Banknote size={22} strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">{t.pricing.freelancerFee}</h2>
              <p className="mt-1 text-sm text-white/70">{t.pricing.freelancerFeeHint}</p>
            </div>
            <div className="px-8 py-6">
              <div className="flex items-end gap-2">
                <span className="text-6xl font-bold tracking-tight text-teal-dark">
                  {t.pricing.freelancerFeeValue}
                </span>
                <span className="mb-2 text-sm text-mid-gray">sur chaque vente</span>
              </div>
              <p className="mt-1 text-sm text-mid-gray">vs 20–36% sur les plateformes internationales</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Paiement garanti par escrow",
                  "Revenus en DZD, sans conversion",
                  "Profil vérifié et crédible",
                  "Support client dédié",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-dark-gray">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white border border-light-border/60 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-wash text-teal">
              <Zap size={20} strokeWidth={1.75} />
            </div>
            <h2 className="text-lg font-semibold text-charcoal">Inclus dans chaque transaction</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.pricing.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-dark-gray">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison table */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-charcoal">
            Tasko vs les alternatives
          </h2>
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light-border bg-off-white/60 text-xs font-semibold uppercase tracking-wide text-mid-gray">
                    <th className="px-5 py-3.5 text-left">Plateforme</th>
                    <th className="px-5 py-3.5">Commission</th>
                    <th className="px-5 py-3.5">Paiement DZD</th>
                    <th className="px-5 py-3.5">Escrow</th>
                    <th className="px-5 py-3.5">Local 🇩🇿</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr
                      key={row.platform}
                      className={`border-b border-light-border/50 last:border-0 ${
                        row.highlight ? "bg-teal-wash/40" : "hover:bg-off-white/40"
                      }`}
                    >
                      <td className={`px-5 py-3.5 font-semibold ${row.highlight ? "text-teal-dark" : "text-charcoal"}`}>
                        {row.platform}
                      </td>
                      <td className={`px-5 py-3.5 text-center font-semibold ${row.highlight ? "text-teal-dark" : "text-danger"}`}>
                        {row.commission}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {row.dzd === "Oui"
                          ? <span className="text-teal font-bold">✓</span>
                          : <span className="text-mid-gray">✗</span>}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {row.escrow === "Oui"
                          ? <span className="text-teal font-bold">✓</span>
                          : <span className="text-mid-gray">✗</span>}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {row.local === "Oui"
                          ? <span className="text-teal font-bold">✓</span>
                          : <span className="text-mid-gray">✗</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 rounded-btn bg-teal px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-teal-dark transition-colors"
          >
            {t.cta.signup}
            <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-mid-gray">Gratuit pour les clients · 10% seulement pour les freelancers</p>
        </div>
      </div>
    </PageShell>
  );
}
