"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, UserCircle } from "lucide-react";
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
      accent: "from-teal-wash to-white",
      dashboardHref: DEMO_USERS.freelancer.dashboardPath,
      profileHref: DEMO_USERS.freelancer.profilePath,
    },
    {
      user: DEMO_USERS.client,
      title: t.demo.client,
      desc: t.demo.clientDesc,
      icon: UserCircle,
      accent: "from-amber-light/30 to-white",
      dashboardHref: DEMO_USERS.client.dashboardPath,
      profileHref: null,
    },
  ];

  return (
    <section id="demo" className="border-y border-light-border/60 bg-white py-20 scroll-mt-20">
      <div className="container-page">
        <SectionHeader title={t.demo.title} subtitle={t.demo.subtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.user.id}
                className={`surface-card overflow-hidden bg-gradient-to-br ${card.accent}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar name={card.user.name} size="lg" />
                      <div>
                        <Badge variant="teal" className="mb-2 normal-case">
                          {t.demo.demoBadge}
                        </Badge>
                        <h3 className="text-lg font-semibold text-charcoal">{card.user.name}</h3>
                        <p className="text-sm text-mid-gray">
                          {"specialty" in card.user
                            ? `${card.user.specialty} · ${card.user.city}`
                            : card.user.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal shadow-sm">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-dark-gray">{card.desc}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-teal">{card.title}</p>
                </div>
                <div className="flex flex-col gap-2 border-t border-light-border/60 bg-white/80 p-4 sm:flex-row">
                  <Link
                    href={card.dashboardHref}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-btn bg-teal px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
                  >
                    {t.demo.viewDashboard}
                    <ArrowRight size={16} />
                  </Link>
                  {card.profileHref && (
                    <Link
                      href={card.profileHref}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-btn border border-light-border bg-white px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-teal hover:text-teal"
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
