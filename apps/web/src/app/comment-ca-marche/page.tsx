"use client";

import Link from "next/link";
import {
  Search, UserCircle, FileText, Lock,
  MessageSquare, Package, CheckCircle2, Star,
  Shield, BadgeCheck, Wallet, ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const stepIcons = [Search, UserCircle, FileText, Lock, MessageSquare, Package, CheckCircle2, Star];

const FAQ = [
  {
    q: "Qu'est-ce que l'escrow Tasko ?",
    a: "Quand vous payez une commande, vos fonds sont bloqués (escrow) sur Tasko — ni le client ni le freelancer ne peut les toucher. Les fonds ne sont libérés vers le freelancer qu'après confirmation de la livraison.",
  },
  {
    q: "Comment fonctionne le paiement BaridiMob ?",
    a: "Lors de la commande, vous êtes redirigé vers l'interface de paiement sécurisé BaridiMob. Après confirmation du paiement, la commande démarre automatiquement.",
  },
  {
    q: "Que se passe-t-il en cas de litige ?",
    a: "Si vous n'êtes pas satisfait de la livraison, vous pouvez demander une révision ou ouvrir un litige. Notre équipe examine les preuves et prend une décision sous 48h.",
  },
  {
    q: "Combien coûte Tasko pour les clients ?",
    a: "Rien. Les clients ne paient aucun frais de plateforme. Seul le prix du service est débité.",
  },
];

export default function HowItWorksPage() {
  const { t } = useLocale();

  return (
    <PageShell>
      {/* Hero */}
      <div className="bg-gradient-to-b from-teal-wash/60 to-off-white">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal-dark">
              <Shield size={14} />
              Simple & sécurisé
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              {t.howItWorks.pageTitle}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mid-gray">
              {t.howItWorks.pageDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 8-step flow */}
      <section className="bg-white py-16">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-semibold text-charcoal sm:text-3xl">
            {t.howItWorks.title}
          </h2>
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-teal-light to-transparent lg:block" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
              {t.howItWorks.steps.map((step, i) => {
                const Icon = stepIcons[i];
                const isPayment = i === 3;
                return (
                  <div key={step.title} className="group relative text-center">
                    <div
                      className={`relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110 group-hover:shadow-md ${
                        isPayment
                          ? "bg-amber-light/60 text-amber-dark group-hover:bg-amber-light"
                          : "bg-teal-wash text-teal group-hover:bg-teal group-hover:text-white"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-charcoal">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-mid-gray">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="border-y border-light-border/60 bg-off-white py-16">
        <div className="container-page">
          <h2 className="mb-10 text-center text-2xl font-semibold text-charcoal">
            Pourquoi faire confiance à Tasko ?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: t.trust.escrow.title,
                desc: t.trust.escrow.desc,
                accent: "bg-teal-wash text-teal",
              },
              {
                icon: BadgeCheck,
                title: t.trust.verified.title,
                desc: t.trust.verified.desc,
                accent: "bg-blue-50 text-blue-600",
              },
              {
                icon: Wallet,
                title: t.trust.payment.title,
                desc: t.trust.payment.desc,
                accent: "bg-amber-light/40 text-amber-dark",
              },
            ].map(({ icon: Icon, title, desc, accent }) => (
              <div key={title} className="surface-card p-8">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid-gray">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container-page max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-semibold text-charcoal">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="surface-card p-6">
                <h3 className="font-semibold text-charcoal">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid-gray">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl font-semibold text-charcoal">Prêt à commencer ?</h2>
          <p className="mx-auto mt-3 max-w-md text-mid-gray">
            Créez votre compte en 2 minutes et commandez votre premier service dès aujourd&apos;hui.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/inscription?role=CLIENT"
              className="inline-flex items-center gap-2 rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:bg-teal-dark transition-colors"
            >
              Je cherche un talent
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/inscription?role=FREELANCER"
              className="inline-flex items-center gap-2 rounded-btn border border-teal px-6 py-3 font-semibold text-teal hover:bg-teal-wash transition-colors"
            >
              Je suis freelancer
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
