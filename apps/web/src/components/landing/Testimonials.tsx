"use client";

import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Testimonials() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <SectionHeader title={t.testimonials.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <blockquote
              key={item.name}
              className="surface-card-hover relative flex flex-col overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-teal to-teal-dark" />

              <div className="flex flex-1 flex-col p-6">
                {/* Quote mark */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-wash text-teal text-2xl font-serif font-bold leading-none">
                  "
                </div>

                <p className="flex-1 text-sm leading-[1.75] text-dark-gray">
                  {item.quote}
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-light-border/50 pt-5">
                  <Avatar name={item.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <footer className="text-sm font-bold text-charcoal">{item.name}</footer>
                    <p className="text-xs text-mid-gray">{item.city}</p>
                  </div>
                  <StarRating rating={5} showValue={false} />
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
