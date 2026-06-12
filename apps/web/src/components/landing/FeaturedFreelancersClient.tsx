"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FreelancerCard } from "@/components/freelancer/FreelancerCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FreelancerSummary } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function FeaturedFreelancersClient({ freelancers }: { freelancers: FreelancerSummary[] }) {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          title={t.featured.title}
          align="left"
          action={
            <Link
              href="/freelancers"
              className="hidden items-center gap-1 text-sm font-semibold text-teal hover:underline sm:flex"
            >
              {t.featured.viewAll}
              <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {freelancers.map((f) => (
            <FreelancerCard key={f.id} freelancer={f} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/freelancers" className="text-sm font-semibold text-teal hover:underline">
            {t.featured.viewAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
