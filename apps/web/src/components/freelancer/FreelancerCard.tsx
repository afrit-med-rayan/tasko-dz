"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { StarRating } from "@/components/ui/StarRating";
import { formatDzd, type FreelancerSummary } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface FreelancerCardProps {
  freelancer: FreelancerSummary;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const { t, locale } = useLocale();

  return (
    <article className="surface-card-hover group flex flex-col p-5">
      <div className="flex items-start gap-4">
        <Avatar name={freelancer.name} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/freelancer/${freelancer.username}`}
              className="text-base font-semibold text-charcoal transition-colors group-hover:text-teal"
            >
              {freelancer.name}
            </Link>
            {freelancer.isVerifiedFreelancer && (
              <VerifiedBadge label={t.freelancers.verified} />
            )}
          </div>
          <p className="mt-0.5 text-sm text-mid-gray">{freelancer.specialty}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StarRating rating={freelancer.averageRating} reviewCount={freelancer.totalReviews} />
            <span className="flex items-center gap-1 text-xs text-mid-gray">
              <MapPin size={12} />
              {freelancer.city}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-light-border/60 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mid-gray">{t.featured.from}</p>
          <p className="text-lg font-bold text-teal">{formatDzd(freelancer.startingPriceDzd, locale)}</p>
        </div>
        <Link
          href={`/freelancer/${freelancer.username}`}
          className="inline-flex items-center gap-1.5 rounded-btn bg-teal px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-dark"
        >
          {t.featured.order}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
