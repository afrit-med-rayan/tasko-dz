"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Logo } from "@/components/ui/Logo";

export function CtaBanner() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-charcoal py-28">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-amber/15 blur-[80px]" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-page relative text-center">
        {/* Brand mark */}
        <div className="mb-8 flex justify-center">
          <Logo variant="light" showAlgerie className="scale-110" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm">
          <Sparkles size={12} className="text-amber" />
          Rejoignez la communaute
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
          {t.cta.subtitle}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
          <Link href="/inscription">
            <Button variant="amber" size="lg" className="sm:min-w-[220px] shadow-lg">
              {t.cta.signup}
            </Button>
          </Link>
          <Link href="/freelancers">
            <Button variant="outline-light" size="lg" className="gap-2 sm:min-w-[220px]">
              {t.cta.browse}
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-xs text-white/30 tracking-wide">
          Gratuit a l'inscription. 0 DZD de frais pour les clients. 10% commission uniquement sur les projets completes.
        </p>
      </div>
    </section>
  );
}
