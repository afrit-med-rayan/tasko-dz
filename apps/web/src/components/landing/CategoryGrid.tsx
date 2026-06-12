"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/api";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const { t, locale } = useLocale();

  return (
    <section className="bg-off-white py-20">
      <div className="container-page">
        <SectionHeader title={t.categories.title} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/freelancers?category=${cat.id}`}
              className="group surface-card-hover flex items-center gap-4 p-5"
            >
              <CategoryIcon icon={cat.icon} className="transition-colors group-hover:bg-teal group-hover:text-white" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-charcoal group-hover:text-teal-dark">
                  {locale === "ar" ? cat.nameAr : cat.nameFr}
                </p>
                <p className="mt-0.5 text-sm text-mid-gray">
                  {cat.freelancerCount} {t.categories.freelancers}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-light-border transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
