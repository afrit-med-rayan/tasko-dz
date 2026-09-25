"use client";

import Link from "next/link";
import { MapPin, Clock, RotateCcw, MessageCircle, ShieldCheck, Globe } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { EscrowNotice } from "@/components/ui/EscrowNotice";
import { formatDzd, type FreelancerProfile } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface Review {
  id: string;
  clientName: string;
  rating: number;
  text: string;
  createdAt: string;
}

const LANG_LABELS: Record<string, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
};

export function FreelancerProfileView({
  profile,
  reviews,
}: {
  profile: FreelancerProfile;
  reviews: Review[];
}) {
  const { t, locale } = useLocale();

  const stats = [
    {
      label: t.profile.rating,
      value: <StarRating rating={profile.averageRating} reviewCount={profile.totalReviews} size="md" />,
    },
    {
      label: t.freelancers.orders,
      value: (
        <p className="text-2xl font-bold text-charcoal">{profile.completedOrdersCount}</p>
      ),
    },
    {
      label: t.profile.response,
      value: <p className="text-2xl font-bold text-charcoal">{profile.responseRate}%</p>,
    },
  ];

  return (
    <div className="pb-20">
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal-light">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="container-page">
        {/* Profile header */}
        <div className="-mt-20 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 text-center sm:text-left">
              <div className="relative shrink-0">
                <Avatar
                  name={profile.name}
                  size="xl"
                  className="ring-[6px] ring-off-white shadow-xl !h-32 !w-32 text-4xl bg-white"
                />
                {profile.isVerifiedFreelancer && (
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <VerifiedBadge label="" />
                  </div>
                )}
              </div>
              <div className="pb-2 w-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
                    {profile.name}
                  </h1>
                  {profile.isVerifiedFreelancer && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-teal bg-teal-wash px-2 py-1 rounded-md">
                      <ShieldCheck size={14} /> {t.freelancers.verified}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-medium text-dark-gray text-lg">{profile.specialty}</p>
                <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-mid-gray">
                  <span className="flex items-center gap-1">
                    <MapPin size={15} />
                    {profile.city}
                  </span>
                  {profile.languages.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Globe size={15} />
                      {profile.languages.map((l) => LANG_LABELS[l] ?? l).join(" · ")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-card px-4 py-5 flex flex-col items-center justify-center border-b-4 border-b-transparent hover:border-b-teal transition-all">
                  <div className="flex justify-center mb-2">{stat.value}</div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-mid-gray">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky order panel - desktop */}
          <div className="hidden lg:block">
            <div className="surface-card mt-16 p-6 shadow-elevated">
              <EscrowNotice
                title={t.profile.escrow}
                amount={formatDzd(profile.startingPriceDzd, locale)}
                subtitle={t.service.fundsSecured}
              />
              <Button variant="amber" size="lg" className="mt-4">
                {t.profile.orderFrom} {formatDzd(profile.startingPriceDzd, locale)}
              </Button>
              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-medium text-teal hover:underline"
              >
                <MessageCircle size={15} />
                {t.profile.contact}
              </button>
              {profile.isVerifiedFreelancer && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-teal-wash/60 px-3 py-2.5 text-xs text-teal-dark">
                  <ShieldCheck size={14} className="shrink-0" />
                  Freelancer vérifié Tasko - identité et historique confirmés
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 lg:hidden">
          <Button variant="amber" size="lg">
            {t.profile.orderFrom} {formatDzd(profile.startingPriceDzd, locale)}
          </Button>
        </div>

        {/* About */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold text-charcoal">{t.profile.about}</h2>
          <p className="mt-3 leading-relaxed text-dark-gray">{profile.bio}</p>
        </section>

        {/* Services */}
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-charcoal flex items-center gap-2">
            {t.profile.services} <span className="text-mid-gray text-lg font-normal">({profile.services.length})</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-3xl">
            {profile.services.map((service) => (
              <article
                key={service.id}
                className="surface-card-hover flex flex-col p-6 group border border-light-border/80 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-teal transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <h3 className="text-lg font-bold text-charcoal group-hover:text-teal transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mid-gray line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-5 flex items-center gap-5 text-xs font-medium text-dark-gray">
                  <span className="flex items-center gap-1.5 bg-off-white px-2 py-1 rounded-md">
                    <Clock size={14} className="text-teal" />
                    {service.deliveryDays} {t.profile.days}
                  </span>
                  <span className="flex items-center gap-1.5 bg-off-white px-2 py-1 rounded-md">
                    <RotateCcw size={14} className="text-teal" />
                    {service.revisionCount} {t.profile.revisions}
                  </span>
                </div>
                {service.tags && service.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-teal-wash/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex items-end justify-between border-t border-light-border pt-5">
                  <div>
                    <span className="block text-[11px] font-bold uppercase text-mid-gray mb-1">Prix fixe</span>
                    <span className="text-2xl font-black text-teal">
                      {formatDzd(service.priceDzd, locale)}
                    </span>
                  </div>
                  <Link href={`/client/order/new/${service.id}`}>
                    <Button size="md" className="shadow-md hover:shadow-lg transition-shadow">Commander</Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-12 max-w-3xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-charcoal">
              {t.profile.reviews}
              {reviews.length > 0 && (
                <span className="ml-2 text-lg font-normal text-mid-gray">({reviews.length})</span>
              )}
            </h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={profile.averageRating} showValue />
              </div>
            )}
          </div>
          {reviews.length === 0 ? (
            <div className="rounded-card border border-dashed border-light-border bg-white py-12 text-center">
              <p className="text-sm text-mid-gray">{t.profile.noReviews}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="surface-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.clientName} size="sm" />
                      <div>
                        <span className="font-semibold text-charcoal">{r.clientName}</span>
                        <p className="text-xs text-mid-gray">
                          {new Date(r.createdAt).toLocaleDateString(locale === "ar" ? "ar-DZ" : "fr-DZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={r.rating} showValue={false} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-dark-gray">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
