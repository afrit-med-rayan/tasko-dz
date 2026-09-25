"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("tasko-token");
    localStorage.removeItem("tasko-role");
    localStorage.removeItem("tasko-user");
    setAuthUser(null);
  };

  const dashboardHref =
    authUser?.role === "FREELANCER" ? "/freelancer/dashboard" : "/client/dashboard";

  const isDashboard =
    pathname.startsWith("/freelancer/") || pathname.startsWith("/client/") || pathname.startsWith("/admin/");
  if (isDashboard) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-light-border/60 bg-white/95 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-teal-wash/70 text-teal font-semibold"
                  : "text-dark-gray hover:bg-off-white hover:text-charcoal"
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
            className="hidden h-9 rounded-lg border border-light-border bg-white px-3 text-xs font-semibold text-mid-gray transition-all hover:border-teal/40 hover:text-teal sm:flex sm:items-center"
            aria-label="Changer de langue"
          >
            {locale === "fr" ? "AR" : "FR"}
          </button>

          {authUser ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-xl border border-light-border bg-off-white/60 px-3.5 py-2 text-sm font-medium text-dark-gray transition-all hover:border-teal/30 hover:bg-white hover:text-teal"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 rounded-xl border border-light-border bg-white px-3 py-1.5">
                <Avatar name={authUser.name} size="sm" className="!h-7 !w-7 !text-xs" />
                <span className="max-w-[90px] truncate text-sm font-medium text-charcoal">
                  {authUser.name.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-1 text-mid-gray transition-colors hover:text-danger"
                  aria-label="Deconnexion"
                >
                  <LogOut size={13} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/connexion" className="hidden sm:block">
                <Button variant="ghost" size="md">
                  {t.nav.login}
                </Button>
              </Link>
              <Link href="/inscription" className="hidden sm:block">
                <Button size="md" className="shadow-sm">
                  {t.nav.signup}
                </Button>
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-white text-charcoal transition-colors hover:bg-off-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer" : "Menu"}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-light-border/60 bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navItems.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(href) ? "bg-teal-wash text-teal-dark font-semibold" : "text-dark-gray hover:bg-off-white"
                }`}
              >
                {t.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="my-4 h-px bg-light-border/60" />

          {authUser ? (
            <div className="flex flex-col gap-1">
              <Link
                href={dashboardHref}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-dark-gray hover:bg-off-white"
              >
                <LayoutDashboard size={16} />
                Mon tableau de bord
              </Link>
              <button
                type="button"
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-danger"
              >
                <LogOut size={16} />
                Deconnexion
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/connexion" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="lg" className="w-full">
                  {t.nav.login}
                </Button>
              </Link>
              <Link href="/inscription" onClick={() => setMobileOpen(false)}>
                <Button size="lg" className="w-full">
                  {t.nav.signup}
                </Button>
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
            className="mt-3 w-full rounded-xl border border-light-border px-4 py-3 text-sm font-medium text-mid-gray"
          >
            {locale === "fr" ? t.footer.arabic : t.footer.french}
          </button>
        </div>
      )}
    </header>
  );
}
