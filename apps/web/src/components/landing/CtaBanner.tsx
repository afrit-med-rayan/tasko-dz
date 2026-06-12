"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function CtaBanner() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="container-page relative text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.cta.title}</h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/85">{t.cta.subtitle}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
          <Link href="/inscription">
            <Button variant="amber" size="lg" className="sm:min-w-[220px] sm:w-auto">
              {t.cta.signup}
            </Button>
          </Link>
          <Link href="/freelancers">
            <Button variant="outline-light" size="lg" className="gap-2 sm:min-w-[220px] sm:w-auto">
              {t.cta.browse}
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
