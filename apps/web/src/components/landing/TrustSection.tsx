"use client";

import { Shield, BadgeCheck, Wallet } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const icons = [Shield, BadgeCheck, Wallet];
const accents = [
  { bg: "bg-teal-wash", text: "text-teal", border: "border-teal/15", topBar: "bg-teal" },
  { bg: "bg-blue-50",   text: "text-blue-600", border: "border-blue-100", topBar: "bg-blue-500" },
  { bg: "bg-amber-light/25", text: "text-amber-dark", border: "border-amber/20", topBar: "bg-amber" },
];

export function TrustSection() {
  const { t } = useLocale();
  const items = [t.trust.escrow, t.trust.verified, t.trust.payment];

  return (
    <section className="bg-off-white py-24">
      <div className="container-page">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">Pourquoi Tasko</p>
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            La plateforme que vous meritez
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-mid-gray">
            Construite pour le marche algerien, par des Algeriens.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            return (
              <div
                key={item.title}
                className={`surface-card-hover overflow-hidden border ${accent.border}`}
              >
                {/* Top color bar */}
                <div className={`h-1 w-full ${accent.topBar}`} />
                <div className="p-8">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg} ${accent.text}`}>
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mid-gray">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
