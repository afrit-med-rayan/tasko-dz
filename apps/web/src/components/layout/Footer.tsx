"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { t, locale, setLocale } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "/freelancers", label: t.nav.explore },
    { href: "/comment-ca-marche", label: t.nav.howItWorks },
    { href: "/tarifs", label: t.nav.pricing },
    { href: "/inscription", label: t.nav.signup },
  ];

  return (
    <footer className="border-t border-light-border bg-charcoal text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
          <p className="mt-6 text-sm text-white/50">
            {t.footer.contact}{" "}
            <a href="mailto:tasko.dza@gmail.com" className="text-teal-light hover:underline">
              tasko.dza@gmail.com
            </a>
          </p>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">{t.footer.navigation}</h4>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">{t.footer.language}</h4>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${locale === "fr" ? "bg-teal text-white" : "bg-white/10 text-white/70 hover:bg-white/15"}`}
            >
              {t.footer.french}
            </button>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${locale === "ar" ? "bg-teal text-white" : "bg-white/10 text-white/70 hover:bg-white/15"}`}
            >
              {t.footer.arabic}
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {year} Tasko. {t.footer.rights}
      </div>
    </footer>
  );
}
