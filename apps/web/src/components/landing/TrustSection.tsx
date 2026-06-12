"use client";

import { Shield, BadgeCheck, Wallet } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const icons = [Shield, BadgeCheck, Wallet];

export function TrustSection() {
  const { t } = useLocale();
  const items = [t.trust.escrow, t.trust.verified, t.trust.payment];

  return (
    <section className="border-y border-light-border/60 bg-white py-20">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.title} className="surface-card p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-wash text-teal">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid-gray">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
