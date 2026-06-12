"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const navItems = [
  { href: "/freelancers", key: "explore" as const },
  { href: "/comment-ca-marche", key: "howItWorks" as const },
  { href: "/tarifs", key: "pricing" as const },
];

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<{ name: string; role: string } | null>(null);

  // Read auth state from localStorage (client-side only)
  useEffect(() => {
    const token = localStorage.getItem("tasko-token");
    const raw = localStorage.getItem("tasko-user");
    const role = localStorage.getItem("tasko-role");
    if (token && raw) {
      try {
        const u = JSON.parse(raw) as { name?: string };
        setAuthUser({ name: u.name ?? "Utilisateur", role: role ?? "CLIENT" });
      } catch {
        // ignore
      }
    }
  }, [pathname]); // re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("tasko-token");
    localStorage.removeItem("tasko-role");
    localStorage.removeItem("tasko-user");
    setAuthUser(null);
  };

  const dashboardHref =
    authUser?.role === "FREELANCER" ? "/freelancer/dashboard" : "/client/dashboard";

  const isDashboard =
    pathname.startsWith("/freelancer/") || pathname.startsWith("/client/");
  if (isDashboard) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-light-border/60 bg-white/90 shadow-nav backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(href) ? "nav-link-active bg-teal-wash/60" : "nav-link"
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
            className="hidden rounded-lg border border-light-border bg-white px-3 py-1.5 text-xs font-semibold text-dark-gray transition-colors hover:border-teal/30 hover:text-teal sm:block"
            aria-label="Changer de langue"
          >
            {locale === "fr" ? t.footer.arabic : t.footer.french}
          </button>

          {authUser ? (
            /* Authenticated state */
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-lg border border-light-border bg-white px-3 py-2 text-sm font-medium text-dark-gray hover:border-teal hover:text-teal transition-colors"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 rounded-xl border border-light-border bg-off-white/60 px-3 py-1.5">
                <Avatar name={authUser.name} size="sm" className="!h-7 !w-7 !text-xs" />
                <span className="max-w-[100px] truncate text-sm font-medium text-charcoal">
                  {authUser.name.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-1 text-mid-gray hover:text-danger transition-colors"
                  aria-label="Déconnexion"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* Guest state */
            <>
              <Link href="/connexion" className="hidden sm:block">
                <Button variant="ghost" size="md">
                  {t.nav.login}
                </Button>
              </Link>
              <Link href="/inscription" className="hidden sm:block">
                <Button size="md">{t.nav.signup}</Button>
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-border text-charcoal md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer" : "Menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-light-border bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(href) ? "bg-teal-wash text-teal-dark" : "text-dark-gray"
                }`}
              >
                {t.nav[key]}
              </Link>
            ))}
            <hr className="my-2 border-light-border" />
            {authUser ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-dark-gray"
                >
                  <LayoutDashboard size={15} />
                  Mon tableau de bord
                </Link>
                <button
                  type="button"
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-danger"
                >
                  <LogOut size={15} />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-dark-gray"
                >
                  {t.nav.login}
                </Link>
                <Link href="/inscription" onClick={() => setMobileOpen(false)} className="mt-1">
                  <Button size="lg">{t.nav.signup}</Button>
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
              className="mt-2 rounded-lg border border-light-border px-3 py-2.5 text-sm font-medium"
            >
              {locale === "fr" ? t.footer.arabic : t.footer.french}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
