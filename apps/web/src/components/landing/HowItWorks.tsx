"use client";

import {
  Search,
  UserCircle,
  FileText,
  Lock,
  MessageSquare,
  Package,
  CheckCircle2,
  Star,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const stepIcons = [Search, UserCircle, FileText, Lock, MessageSquare, Package, CheckCircle2, Star];

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <SectionHeader title={t.howItWorks.title} subtitle={t.howItWorks.subtitle} />
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-teal-light to-transparent lg:block" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
            {t.howItWorks.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.title} className="group relative text-center">
                  <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-wash text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-charcoal">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mid-gray">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
