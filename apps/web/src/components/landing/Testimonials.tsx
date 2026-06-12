"use client";

import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Testimonials() {
  const { t } = useLocale();

  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeader title={t.testimonials.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <blockquote key={item.name} className="surface-card relative flex flex-col p-6">
              <Quote size={28} className="text-teal/20" strokeWidth={1.5} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-dark-gray">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-light-border/60 pt-5">
                <Avatar name={item.name} size="sm" />
                <div>
                  <footer className="text-sm font-semibold text-charcoal">{item.name}</footer>
                  <p className="text-xs text-mid-gray">{item.city}</p>
                </div>
                <div className="ms-auto">
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
