"use client";

import Link from "next/link";
import { ArrowRight, Banknote, Smartphone, Shield, CheckCircle2, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { DEMO_USERS } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const TRUST_BADGES = [
  { icon: Shield, label: "Escrow securise" },
  { icon: CheckCircle2, label: "Freelancers verifies" },
  { icon: Users, label: "500+ talents actifs" },
];

export function Hero() {
  const { t } = useLocale();
  const demo = DEMO_USERS.freelancer;

  const stats = [
    { value: "500+", label: t.hero.statFreelancers },
    { value: "10%", label: t.hero.statCommission },
    { value: "4.8", label: t.hero.statRating },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fffe] via-teal-wash/40 to-[#fdfcf8]" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1d9e75 1px, transparent 1px), linear-gradient(90deg, #1d9e75 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-teal/8 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber/6 blur-[80px]" />

      <div className="container-page relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28 lg:gap-24">
        {/* Left column */}
        <div className="animate-fade-in">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/90 px-4 py-2 text-xs font-semibold text-teal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            {t.hero.badge}
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-[3.4rem]">
            {t.hero.title}
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-mid-gray">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/inscription?role=FREELANCER">
              <Button size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                {t.hero.ctaFreelancer}
              </Button>
            </Link>
            <Link href="/inscription?role=CLIENT">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                {t.hero.ctaClient}
              </Button>
            </Link>
          </div>

          {/* Trust pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-light-border/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-dark-gray shadow-sm backdrop-blur-sm"
              >
                <Icon size={12} className="text-teal" />
                {label}
              </span>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex divide-x divide-light-border overflow-hidden rounded-2xl border border-light-border/60 bg-white/80 shadow-sm backdrop-blur-sm">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex-1 px-4 py-5 text-center">
                <p className="text-[1.75rem] font-bold leading-none tracking-tight text-teal">
                  {stat.value}
                  {i === 2 && <Star size={16} className="inline ml-0.5 text-amber mb-1" fill="currentColor" />}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-mid-gray">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - live demo card */}
        <div className="animate-slide-up md:justify-self-end">
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent" />

            <div className="relative surface-card overflow-hidden shadow-[0_20px_60px_-12px_rgba(29,158,117,0.2)]">
              {/* Card header */}
              <div className="border-b border-light-border/50 bg-gradient-to-r from-teal-wash/60 to-white/60 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-mid-gray">
                    {t.hero.preview}
                  </span>
                  <span className="rounded-full bg-amber/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-dark ring-1 ring-amber/20">
                    {t.hero.inProgress}
                  </span>
                </div>
              </div>

              {/* Freelancer row */}
              <div className="p-5">
                <div className="flex items-center gap-3.5">
                  <Avatar name={demo.name} size="md" />
                  <div className="min-w-0 flex-1">
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

                {/* Progress indicator */}
                <div className="mt-5 rounded-xl bg-off-white/80 p-4">
                  <div className="flex items-center justify-between text-xs font-medium text-mid-gray mb-2">
                    <span>Progression du projet</span>
                    <span className="text-teal font-semibold">65%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-light-border/60">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-teal to-teal-dark transition-all" />
                  </div>
                </div>

                {/* Escrow box */}
                <div className="mt-4">
                  <EscrowNotice
                    title={t.hero.secureEscrow}
                    amount="3 500 DZD"
                    subtitle="Logo professionnel + fichiers sources"
                    compact
                  />
                </div>

                {/* Payment CTA */}
                <Link href="/client/order/new/s1" className="block mt-5 w-full">
                  <Button variant="amber" size="lg" className="w-full gap-2 shadow-md">
                    <Smartphone size={18} />
                    {t.hero.payBaridiMob}
                  </Button>
                </Link>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mid-gray">
                  <Banknote size={14} />
                  {t.hero.orCib}
                </p>
              </div>
            </div>
          </div>

          {/* Explore link */}
          <Link
            href="/freelancers"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-teal/20 bg-teal-wash/50 px-4 py-3.5 text-sm font-semibold text-teal-dark transition-all hover:bg-teal-wash hover:shadow-sm"
          >
            {t.hero.exploreFreelancers}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
