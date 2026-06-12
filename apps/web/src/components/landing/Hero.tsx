"use client";

import Link from "next/link";
import { ArrowRight, Banknote, Smartphone, Shield, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const TRUST_BADGES = [
  { icon: Shield, label: "Escrow sécurisé" },
  { icon: CheckCircle2, label: "Freelancers vérifiés" },
  { icon: Users, label: "500+ talents actifs" },
];

export function Hero() {
  const { t } = useLocale();
  const demo = DEMO_USERS.freelancer;

  const stats = [
    { value: "500+", label: t.hero.statFreelancers },
    { value: "10%", label: t.hero.statCommission },
    { value: "4.8★", label: t.hero.statRating },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-wash/70 via-teal-wash/20 to-off-white">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal/6 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-amber/5 blur-3xl" />

      <div className="container-page relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24 lg:gap-20">
        {/* Left */}
        <div className="animate-fade-in">
          <Badge variant="amber" className="mb-5 normal-case tracking-normal">
            {t.hero.badge}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-charcoal sm:text-5xl lg:text-[3.25rem]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-mid-gray">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/inscription?role=FREELANCER" className="sm:flex-1 sm:max-w-[220px]">
              <Button size="lg">{t.hero.ctaFreelancer}</Button>
            </Link>
            <Link href="/inscription?role=CLIENT" className="sm:flex-1 sm:max-w-[220px]">
              <Button variant="secondary" size="lg">
                {t.hero.ctaClient}
              </Button>
            </Link>
          </div>

          {/* Trust micro-badges */}
          <div className="mt-7 flex flex-wrap gap-3">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-dark-gray ring-1 ring-light-border shadow-sm"
              >
                <Icon size={12} className="text-teal" />
                {label}
              </span>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex divide-x divide-light-border overflow-hidden rounded-card border border-light-border/80 bg-white/70 backdrop-blur-sm shadow-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 py-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-teal">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-mid-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — demo order card */}
        <div className="animate-fade-in md:justify-self-end">
          <div className="surface-card max-w-sm overflow-hidden shadow-elevated">
            {/* Card header */}
            <div className="border-b border-light-border/60 bg-off-white/60 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-mid-gray">
                  {t.hero.preview}
                </span>
                <span className="rounded-full bg-amber-light/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-dark">
                  {t.hero.inProgress}
                </span>
              </div>
            </div>

            {/* Freelancer info */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <Avatar name={demo.name} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-charcoal">{demo.name}</p>
                    <VerifiedBadge label={t.freelancers.verified} />
                  </div>
                  <p className="text-sm text-mid-gray">
                    {demo.specialty} · {demo.city}
                  </p>
                  <StarRating rating={4.9} reviewCount={47} className="mt-1" />
                </div>
              </div>

              {/* Escrow notice */}
              <div className="mt-5">
                <EscrowNotice
                  title={t.hero.secureEscrow}
                  amount="3 500 DZD"
                  subtitle="Logo professionnel + fichiers sources"
                  compact
                />
              </div>

              {/* Payment CTAs */}
              <Button variant="amber" size="lg" className="mt-5 gap-2">
                <Smartphone size={18} />
                {t.hero.payBaridiMob}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mid-gray">
                <Banknote size={14} />
                {t.hero.orCib}
              </p>
            </div>
          </div>

          {/* Explore link */}
          <Link
            href="/freelancers"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-btn border border-teal/20 bg-teal-wash/60 px-4 py-3 text-sm font-semibold text-teal-dark transition-colors hover:bg-teal-wash hover:text-teal"
          >
            {t.hero.exploreFreelancers}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
