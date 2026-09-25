"use client";

import {
  Search, UserCircle, FileText, Lock,
  MessageSquare, Package, CheckCircle2, Star,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const stepIcons = [Search, UserCircle, FileText, Lock, MessageSquare, Package, CheckCircle2, Star];
const stepColors = [
  "bg-teal-wash text-teal",
  "bg-amber-light/30 text-amber-dark",
  "bg-blue-50 text-blue-600",
  "bg-teal-wash text-teal",
  "bg-purple-50 text-purple-600",
  "bg-amber-light/30 text-amber-dark",
  "bg-teal-wash text-teal-dark",
  "bg-amber-light/30 text-amber-dark",
];

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <SectionHeader title={t.howItWorks.title} subtitle={t.howItWorks.subtitle} />
        <div className="relative mt-12">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-teal-light/60 to-transparent lg:block" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
            {t.howItWorks.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const colorClass = stepColors[i] || "bg-teal-wash text-teal";
              return (
                <div
                  key={step.title}
                  className="group relative flex flex-col items-center text-center"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Icon circle */}
                  <div className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${colorClass}`}>
                    <Icon size={22} strokeWidth={1.75} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[9px] font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm font-semibold text-charcoal">{step.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-mid-gray">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
