"use client";

import Link from "next/link";
import { Clock, RotateCcw, ChevronLeft, Smartphone, Shield, CheckCircle2, CreditCard } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { StarRating } from "@/components/ui/StarRating";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { formatDzd } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface ServiceDetailProps {
  service: {
    id: string;
    title: string;
    description: string;
    deliveryDays: number;
    revisionCount: number;
    priceDzd: number;
    tags?: string[];
    freelancer: {
      username: string;
      name: string;
      isVerifiedFreelancer: boolean;
      averageRating: number;
      totalReviews?: number;
      city?: string;
      specialty?: string;
    };
  };
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const { t, locale } = useLocale();

  const whatsIncluded = [
    { label: `Livraison en ${service.deliveryDays} jour${service.deliveryDays > 1 ? "s" : ""}`, icon: Clock },
    { label: `${service.revisionCount} révision${service.revisionCount > 1 ? "s" : ""} incluse${service.revisionCount > 1 ? "s" : ""}`, icon: RotateCcw },
    { label: "Protection escrow Tasko", icon: Shield },
    { label: "Fichiers sources inclus", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Breadcrumb */}
      <div className="border-b border-light-border/60 bg-white">
        <div className="container-page py-4">
          <Link
            href={`/freelancer/${service.freelancer.username}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-mid-gray hover:text-teal transition-colors"
          >
            <ChevronLeft size={16} />
            {service.freelancer.name}
          </Link>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-charcoal leading-tight">
                {service.title}
              </h1>

              {/* Freelancer info row */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href={`/freelancer/${service.freelancer.username}`}
                  className="flex items-center gap-3 group"
                >
                  <Avatar name={service.freelancer.name} size="sm" />
                  <div>
                    <span className="text-sm font-semibold text-charcoal group-hover:text-teal transition-colors">
                      {service.freelancer.name}
                    </span>
                    {service.freelancer.specialty && (
                      <p className="text-xs text-mid-gray">{service.freelancer.specialty}</p>
                    )}
                  </div>
                </Link>
                {service.freelancer.isVerifiedFreelancer && (
                  <VerifiedBadge label={t.freelancers.verified} />
                )}
                <StarRating
                  rating={service.freelancer.averageRating}
                  reviewCount={service.freelancer.totalReviews}
                  showValue
                />
              </div>
            </div>

            {/* Service image placeholder / portfolio */}
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-teal-wash to-teal-light/30 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 text-teal">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-medium text-teal-dark">Aperçu du service</p>
              </div>
            </div>

            {/* Description */}
            <div className="surface-card p-6">
              <h2 className="text-lg font-semibold text-charcoal">Description du service</h2>
              <p className="mt-3 leading-relaxed text-dark-gray">{service.description}</p>

              {/* Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-off-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-mid-gray ring-1 ring-light-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* What's included */}
            <div className="surface-card p-6">
              <h2 className="text-lg font-semibold text-charcoal">Ce qui est inclus</h2>
              <ul className="mt-4 space-y-3">
                {whatsIncluded.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-dark-gray">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-wash text-teal">
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* About freelancer */}
            <div className="surface-card p-6">
              <h2 className="text-lg font-semibold text-charcoal">À propos du freelancer</h2>
              <div className="mt-4 flex items-center gap-4">
                <Avatar name={service.freelancer.name} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal">{service.freelancer.name}</span>
                    {service.freelancer.isVerifiedFreelancer && (
                      <VerifiedBadge label={t.freelancers.verified} />
                    )}
                  </div>
                  {service.freelancer.city && (
                    <p className="mt-0.5 text-sm text-mid-gray">{service.freelancer.city}</p>
                  )}
                  <StarRating
                    rating={service.freelancer.averageRating}
                    reviewCount={service.freelancer.totalReviews}
                    className="mt-1"
                  />
                </div>
              </div>
              <Link
                href={`/freelancer/${service.freelancer.username}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
              >
                Voir le profil complet →
              </Link>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-2">
            <div className="surface-card sticky top-24 overflow-hidden shadow-elevated">
              {/* Price header */}
              <div className="bg-gradient-to-br from-teal to-teal-dark px-6 py-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Prix du service
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight">
                  {formatDzd(service.priceDzd, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {service.deliveryDays} jour{service.deliveryDays > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw size={14} />
                    {service.revisionCount} révision{service.revisionCount > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <EscrowNotice
                  title={t.profile.escrow}
                  subtitle={t.service.fundsSecured}
                />

                <Button variant="amber" size="lg" className="gap-2">
                  <Smartphone size={18} />
                  {t.service.payBaridiMob}
                </Button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-btn border border-light-border bg-white py-3 text-sm font-semibold text-dark-gray hover:border-teal hover:text-teal transition-colors"
                >
                  <CreditCard size={16} />
                  {t.service.orCib}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-mid-gray border-t border-light-border/60 pt-3">
                  <CheckCircle2 size={13} className="text-teal" />
                  {t.service.clientFeeFree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
