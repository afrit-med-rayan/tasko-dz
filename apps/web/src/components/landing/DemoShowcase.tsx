"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, UserCircle, CheckCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function DemoShowcase() {
  const { t } = useLocale();

  const cards = [
    {
      user: DEMO_USERS.freelancer,
      title: t.demo.freelancer,
      desc: t.demo.freelancerDesc,
      icon: Briefcase,
      gradient: "from-teal-wash/80 via-white to-white",
      accentBorder: "border-teal/20",
      accentButton: "bg-teal text-white hover:bg-teal-dark",
      dashboardHref: DEMO_USERS.freelancer.dashboardPath,
      profileHref: DEMO_USERS.freelancer.profilePath,
      features: [
        "Tableau de bord complet",
        "Gestion des commandes en temps reel",
        "Portefeuille DZD securise",
      ],
    },
    {
      user: DEMO_USERS.client,
      title: t.demo.client,
      desc: t.demo.clientDesc,
      icon: UserCircle,
      gradient: "from-amber-light/20 via-white to-white",
      accentBorder: "border-amber/20",
      accentButton: "bg-amber text-white hover:bg-amber-dark",
      dashboardHref: DEMO_USERS.client.dashboardPath,
      profileHref: null,
      features: [
        "Passer une commande avec brief",
        "Paiement escrow securise",
        "Suivi de livraison en direct",
      ],
    },
  ];

  return (
    <section id="demo" className="bg-off-white py-24 scroll-mt-20">
      <div className="container-page">
        <SectionHeader title={t.demo.title} subtitle={t.demo.subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.user.id}
                className={`surface-card overflow-hidden border ${card.accentBorder}`}
              >
                <div className={`bg-gradient-to-br ${card.gradient} p-6`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar name={card.user.name} size="lg" />
                      <div>
                        <Badge variant="teal" className="mb-2 normal-case text-[10px]">
                          {t.demo.demoBadge}
                        </Badge>
                        <h3 className="text-lg font-bold text-charcoal">{card.user.name}</h3>
                        <p className="text-sm text-mid-gray">
                          {"specialty" in card.user
                            ? `${card.user.specialty} · ${card.user.city}`
                            : card.user.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-sm">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-dark-gray">{card.desc}</p>

                  {/* Feature list */}
                  <ul className="mt-4 space-y-2">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-dark-gray">
                        <CheckCircle2 size={15} className="shrink-0 text-teal" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 border-t border-light-border/60 bg-white/90 p-4 sm:flex-row">
                  <Link
                    href={card.dashboardHref}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${card.accentButton}`}
                  >
                    {t.demo.viewDashboard}
                    <ArrowRight size={16} />
                  </Link>
                  {card.profileHref && (
                    <Link
                      href={card.profileHref}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-light-border bg-white px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-teal hover:text-teal"
                    >
                      {t.demo.viewProfile}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
