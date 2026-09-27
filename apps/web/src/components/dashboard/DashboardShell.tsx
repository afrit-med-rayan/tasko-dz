"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Briefcase, ShoppingBag, MessageSquare,
  Wallet, BarChart3, User, LogOut, Plus, Menu, X, Bell,
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
          { href: "/freelancer/dashboard", label: fd.title, icon: <LayoutDashboard size={17} /> },
          { href: "/freelancer/dashboard#services", label: fd.myServices, icon: <Briefcase size={17} /> },
          { href: "/freelancer/dashboard#orders", label: fd.orders, icon: <ShoppingBag size={17} />, badge: 3 },
          { href: "/freelancer/messages", label: fd.messages, icon: <MessageSquare size={17} />, badge: 2 },
          { href: "/freelancer/wallet", label: fd.wallet, icon: <Wallet size={17} /> },
          { href: "/freelancer/analytics", label: fd.analytics, icon: <BarChart3 size={17} /> },
          { href: "/freelancer/yacine-bensalem", label: fd.profile, icon: <User size={17} /> },
        ]
      : [
          { href: "/client/dashboard", label: cd.title, icon: <LayoutDashboard size={17} /> },
          { href: "/client/dashboard#orders", label: cd.orders, icon: <ShoppingBag size={17} />, badge: 2 },
          { href: "/client/messages", label: cd.messages, icon: <MessageSquare size={17} /> },
          { href: "/client/account", label: cd.account, icon: <User size={17} /> },
        ];

  const isActive = (href: string) => {
    if (href.includes("#") && !href.startsWith("#")) {
      const base = href.split("#")[0];
      return pathname === base;
    }
    if (href.startsWith("#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo area */}
      <div className="flex h-16 items-center border-b border-light-border/60 px-5">
        <Logo showAlgerie />
      </div>

      {/* Role badge */}
      <div className="px-4 pt-4 pb-2">
        <div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
          role === "freelancer"
            ? "bg-teal-wash text-teal-dark"
            : "bg-amber-light/30 text-amber-dark"
        }`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {role === "freelancer" ? "Mode Freelancer" : "Mode Client"}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-teal text-white shadow-sm"
                  : "text-dark-gray hover:bg-off-white hover:text-charcoal"
              }`}
            >
              <span className={active ? "text-white" : "text-mid-gray"}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  active ? "bg-white/25 text-white" : "bg-amber text-white"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-light-border/60 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-off-white/60 px-3 py-2.5">
          <Avatar name={userName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-charcoal">{userName}</p>
            <p className="text-[10px] font-medium text-teal uppercase tracking-wide">Demo</p>
          </div>
        </div>
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-mid-gray transition-colors hover:text-teal"
        >
          <LogOut size={13} />
          {t.common.home}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-off-white">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-e border-light-border/60 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-e border-light-border bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-mid-gray hover:bg-off-white"
          aria-label="Fermer"
        >
          <X size={17} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-light-border/60 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-light-border text-charcoal hover:bg-off-white"
              aria-label="Menu"
            >
              <Menu size={17} />
            </button>
            <Logo />
          </div>

          {/* Desktop: greeting */}
          <div className="hidden lg:block">
            <p className="text-sm text-mid-gray">
              {role === "freelancer" ? fd.greeting : cd.greeting},{" "}
              <span className="font-bold text-charcoal">{userName}</span>
            </p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {headerAction}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-light-border bg-white text-mid-gray hover:bg-off-white hover:text-charcoal transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber" />
            </button>
            <div className="lg:hidden">
              <Avatar name={userName} size="sm" />
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
    <Link
      href="/freelancer/yacine-bensalem"
      className="inline-flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-dark"
    >
      <Plus size={16} />
      {t.dashboard.freelancer.newService}
    </Link>
  );
}
