"use client";

import Link from "next/link";
import { MapPin, Clock, RotateCcw, MessageCircle, ShieldCheck, Globe, Star, CheckCircle } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
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

  return (
    <div className="min-h-screen bg-off-white pb-24">
      {/* Hero cover */}
      <div className="relative h-52 w-full bg-gradient-to-br from-teal-dark via-teal to-teal-light">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="container-page">
        {/* ---- Profile header ---- */}
        <div className="relative -mt-16 mb-8">
          <div className="surface-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">

              {/* Avatar */}
              <div className="relative shrink-0 self-start">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  <Avatar
                    name={profile.name}
                    size="xl"
                    className="h-full w-full rounded-2xl text-4xl shadow-lg ring-4 ring-white"
                  />
                  {profile.isVerifiedFreelancer && (
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-teal shadow-md">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">
                        {profile.name}
                      </h1>
                      {profile.isVerifiedFreelancer && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-wash px-2.5 py-1 text-xs font-bold text-teal-dark">
                          <ShieldCheck size={13} />
                          {t.freelancers.verified}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-semibold text-dark-gray">{profile.specialty}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-mid-gray">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-teal" />
                        {profile.city}
                      </span>
                      {profile.languages.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Globe size={14} className="text-teal" />
                          {profile.languages.map((l) => LANG_LABELS[l] ?? l).join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA - desktop right side */}
                  <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-2">
                    <Link href={`/client/order/new/${profile.services[0]?.id ?? ""}`}>
                      <Button variant="amber" size="lg">
                        Commander - dès {formatDzd(profile.startingPriceDzd, locale)}
                      </Button>
                    </Link>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
                    >
                      <MessageCircle size={15} />
                      {t.profile.contact}
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-light-border/60 pt-5">
                  <div className="flex items-center gap-2">
                    <StarRating rating={profile.averageRating} reviewCount={profile.totalReviews} size="md" />
                  </div>
                  <div className="text-sm text-mid-gray">
                    <span className="font-bold text-charcoal text-base">{profile.completedOrdersCount}</span> commandes
                  </div>
                  <div className="text-sm text-mid-gray">
                    <span className="font-bold text-charcoal text-base">{profile.responseRate}%</span> de réponse
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-5 flex gap-3 sm:hidden">
              <Link href={`/client/order/new/${profile.services[0]?.id ?? ""}`} className="flex-1">
                <Button variant="amber" size="lg" className="w-full">
                  Commander
                </Button>
              </Link>
              <button
                type="button"
                className="flex h-12 items-center gap-1.5 rounded-xl border border-light-border px-4 text-sm font-medium text-teal hover:bg-teal-wash"
              >
                <MessageCircle size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ---- Main grid ---- */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT: bio + services + reviews */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section>
              <h2 className="mb-3 text-xl font-bold text-charcoal">{t.profile.about}</h2>
              <div className="surface-card p-6">
                <p className="leading-relaxed text-dark-gray">{profile.bio}</p>
              </div>
            </section>

            {/* Services */}
            <section id="services">
              <h2 className="mb-5 text-xl font-bold text-charcoal">
                {t.profile.services}
                <span className="ml-2 text-base font-normal text-mid-gray">({profile.services.length})</span>
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {profile.services.map((service) => (
                  <article
                    key={service.id}
                    className="surface-card group flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(29,158,117,0.15)]"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-charcoal transition-colors group-hover:text-teal">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-mid-gray line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium">
                      <span className="flex items-center gap-1.5 rounded-lg bg-off-white px-2.5 py-1.5 text-dark-gray">
                        <Clock size={13} className="text-teal" />
                        {service.deliveryDays} {t.profile.days}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-lg bg-off-white px-2.5 py-1.5 text-dark-gray">
                        <RotateCcw size={13} className="text-teal" />
                        {service.revisionCount} {t.profile.revisions}
                      </span>
                    </div>

                    {service.tags && service.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-teal-wash px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-dark"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-end justify-between border-t border-light-border pt-5">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-mid-gray">Prix fixe</p>
                        <p className="text-2xl font-black text-teal">{formatDzd(service.priceDzd, locale)}</p>
                      </div>
                      <Link href={`/client/order/new/${service.id}`}>
                        <Button size="md">Commander</Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-charcoal">
                  {t.profile.reviews}
                  {reviews.length > 0 && (
                    <span className="ml-2 text-base font-normal text-mid-gray">({reviews.length})</span>
                  )}
                </h2>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <StarRating rating={profile.averageRating} showValue />
                  </div>
                )}
              </div>
              {reviews.length === 0 ? (
                <div className="surface-card border border-dashed py-12 text-center">
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

          {/* RIGHT: sticky order sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Order card */}
              <div className="surface-card overflow-hidden shadow-elevated">
                <div className="bg-gradient-to-br from-teal to-teal-dark p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70">{t.profile.escrow}</p>
                  <p className="mt-1 text-3xl font-black">{formatDzd(profile.startingPriceDzd, locale)}</p>
                  <p className="mt-0.5 text-xs text-white/60">{t.service.fundsSecured}</p>
                </div>
                <div className="p-5 space-y-3">
                  <Link href={`/client/order/new/${profile.services[0]?.id ?? ""}`} className="block">
                    <Button variant="amber" size="lg" className="w-full shadow-md">
                      Commander dès {formatDzd(profile.startingPriceDzd, locale)}
                    </Button>
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-light-border py-2.5 text-sm font-medium text-dark-gray hover:bg-off-white transition-colors"
                  >
                    <MessageCircle size={15} />
                    {t.profile.contact}
                  </button>
                </div>
              </div>

              {/* Trust badge */}
              {profile.isVerifiedFreelancer && (
                <div className="surface-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-wash">
                      <ShieldCheck size={18} className="text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal">Freelancer verifie Tasko</p>
                      <p className="mt-0.5 text-xs text-mid-gray">Identite et historique confirmes par Tasko</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats summary */}
              <div className="surface-card divide-y divide-light-border/50">
                {[
                  { label: "Note moyenne", value: `${profile.averageRating}/5`, icon: <Star size={15} className="text-amber" /> },
                  { label: "Commandes terminees", value: String(profile.completedOrdersCount), icon: <CheckCircle size={15} className="text-teal" /> },
                  { label: "Taux de reponse", value: `${profile.responseRate}%`, icon: <MessageCircle size={15} className="text-teal" /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-mid-gray">
                      {item.icon}
                      {item.label}
                    </div>
                    <span className="text-sm font-bold text-charcoal">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
