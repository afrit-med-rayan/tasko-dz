"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t, locale, setLocale } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "/freelancers", label: t.nav.explore },
    { href: "/comment-ca-marche", label: t.nav.howItWorks },
    { href: "/tarifs", label: t.nav.pricing },
    { href: "/inscription", label: t.nav.signup },
    { href: "/connexion", label: t.nav.login },
  ];

  return (
    <footer className="border-t border-white/5 bg-charcoal text-white">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Logo variant="light" showAlgerie />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              {t.footer.tagline}
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:tasko.dza@gmail.com"
                className="flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-teal-light"
              >
                <Mail size={14} className="text-teal-light/60" />
                tasko.dza@gmail.com
              </a>
              <p className="flex items-center gap-2.5 text-sm text-white/50">
                <MapPin size={14} className="text-teal-light/60" />
                Alger, Algerie
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              {t.footer.navigation}
            </h4>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language + legal */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              {t.footer.language}
            </h4>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setLocale("fr")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  locale === "fr"
                    ? "bg-teal text-white shadow-sm"
                    : "bg-white/8 text-white/60 hover:bg-white/15"
                }`}
              >
                {t.footer.french}
              </button>
              <button
                type="button"
                onClick={() => setLocale("ar")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  locale === "ar"
                    ? "bg-teal text-white shadow-sm"
                    : "bg-white/8 text-white/60 hover:bg-white/15"
                }`}
              >
                {t.footer.arabic}
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="h-1 w-1 rounded-full bg-teal" />
                Paiement 100% DZD
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="h-1 w-1 rounded-full bg-amber" />
                Escrow securise garanti
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="h-1 w-1 rounded-full bg-teal-light" />
                10% commission uniquement
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/30 sm:flex-row">
          <span>&copy; {year} Tasko Algeria. {t.footer.rights}</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white/60 transition-colors">Confidentialite</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
