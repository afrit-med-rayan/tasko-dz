"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Briefcase, ShoppingBag, MessageSquare,
  Wallet, BarChart3, User, LogOut, Plus, Menu, X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardShellProps {
  role: "freelancer" | "client";
  userName: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function DashboardShell({ role, userName, children, headerAction }: DashboardShellProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const fd = t.dashboard.freelancer;
  const cd = t.dashboard.client;

  const navItems: NavItem[] =
    role === "freelancer"
      ? [
          { href: "/freelancer/dashboard", label: fd.title, icon: <LayoutDashboard size={18} /> },
          { href: "/freelancer/dashboard#services", label: fd.myServices, icon: <Briefcase size={18} /> },
          { href: "/freelancer/dashboard#orders", label: fd.orders, icon: <ShoppingBag size={18} />, badge: 3 },
          { href: "#messages", label: fd.messages, icon: <MessageSquare size={18} />, badge: 2 },
          { href: "/freelancer/wallet", label: fd.wallet, icon: <Wallet size={18} /> },
          { href: "#analytics", label: fd.analytics, icon: <BarChart3 size={18} /> },
          { href: "/freelancer/yacine-bensalem", label: fd.profile, icon: <User size={18} /> },
        ]
      : [
          { href: "/client/dashboard", label: cd.title, icon: <LayoutDashboard size={18} /> },
          { href: "/client/dashboard#orders", label: cd.orders, icon: <ShoppingBag size={18} />, badge: 2 },
          { href: "#messages", label: cd.messages, icon: <MessageSquare size={18} /> },
          { href: "#account", label: cd.account, icon: <User size={18} /> },
        ];

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    const base = href.split("#")[0];
    return pathname === href || (base !== "/" && pathname.startsWith(base) && !href.includes("#"));
  };

  const SidebarContent = () => (
    <>
      <div className="border-b border-light-border px-5 py-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-teal-wash text-teal-dark"
                  : "text-dark-gray hover:bg-off-white hover:text-charcoal"
              }`}
            >
              <span className={active ? "text-teal" : "text-mid-gray"}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-light-border p-4">
        <div className="flex items-center gap-3">
          <Avatar name={userName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-charcoal">{userName}</p>
            <Badge variant="verified" className="mt-0.5 normal-case">
              {t.demo.demoBadge}
            </Badge>
          </div>
        </div>
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mt-3 flex items-center gap-2 text-xs font-medium text-mid-gray hover:text-teal transition-colors"
        >
          <LogOut size={14} />
          {t.common.home}
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-off-white">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-e border-light-border bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-e border-light-border bg-white shadow-elevated transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-mid-gray hover:bg-off-white"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-light-border bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-light-border text-charcoal hover:bg-off-white"
                aria-label="Menu"
              >
                <Menu size={18} />
              </button>
              <Logo />
            </div>

            {/* Desktop: greeting */}
            <div className="hidden lg:block">
              <p className="text-sm text-mid-gray">
                {role === "freelancer" ? fd.greeting : cd.greeting},{" "}
                <span className="font-semibold text-charcoal">{userName}</span>
              </p>
            </div>

            {/* Right side header action */}
            <div className="flex items-center gap-3">
              {headerAction}
              {/* Mobile avatar */}
              <div className="lg:hidden">
                <Avatar name={userName} size="sm" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardNewServiceButton() {
  const { t } = useLocale();
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-dark transition-colors"
    >
      <Plus size={16} />
      {t.dashboard.freelancer.newService}
    </button>
  );
}
