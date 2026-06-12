"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Smartphone, Shield, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Demo shortcuts for easy v0 testing
const DEMO_ACCOUNTS = [
  { label: "Freelancer Demo", phone: "+213655000001", role: "FREELANCER", dashboard: "/freelancer/dashboard" },
  { label: "Client Demo", phone: "+213655000002", role: "CLIENT", dashboard: "/client/dashboard" },
];

export default function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOtpStep = searchParams.get("step") === "otp";

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Erreur");
      sessionStorage.setItem("tasko-phone", phone);
      // Pre-set role from demo accounts
      const demo = DEMO_ACCOUNTS.find((d) => d.phone === phone);
      if (demo) sessionStorage.setItem("tasko-role", demo.role);
      router.push("/connexion?step=otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const storedPhone = sessionStorage.getItem("tasko-phone") ?? phone;
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: storedPhone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Erreur");
      // Persist session
      localStorage.setItem("tasko-token", data.accessToken);
      const user = data.user as { role?: string } | undefined;
      const role = user?.role ?? sessionStorage.getItem("tasko-role") ?? "CLIENT";
      localStorage.setItem("tasko-role", role);
      localStorage.setItem("tasko-user", JSON.stringify(data.user ?? {}));
      // Route to correct dashboard
      const dest = role === "FREELANCER" ? "/freelancer/dashboard" : "/client/dashboard";
      router.push(dest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (demo: (typeof DEMO_ACCOUNTS)[0]) => {
    setLoading(true);
    setError("");
    try {
      // Register/login the demo account
      await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: demo.phone, name: demo.label, role: demo.role }),
      });
      sessionStorage.setItem("tasko-phone", demo.phone);
      sessionStorage.setItem("tasko-role", demo.role);
      // Verify with dev OTP
      const res = await fetch(`${API_BASE}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: demo.phone, otp: "1234" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Erreur");
      localStorage.setItem("tasko-token", data.accessToken);
      localStorage.setItem("tasko-role", demo.role);
      localStorage.setItem("tasko-user", JSON.stringify(data.user ?? {}));
      router.push(demo.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const storedPhone = typeof globalThis.window !== "undefined" ? sessionStorage.getItem("tasko-phone") : "";

  // ── OTP Step ────────────────────────────────────────────────────────────────
  if (isOtpStep) {
    return (
      <PageShell>
        <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-teal-wash/40 to-off-white px-4 py-16">
          <div className="surface-card w-full max-w-md overflow-hidden shadow-elevated">
            {/* Top bar */}
            <div className="bg-gradient-to-r from-teal to-teal-dark px-8 py-6 text-center text-white">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Smartphone size={28} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl font-semibold">{t.auth.otpTitle}</h1>
              <p className="mt-1 text-sm text-white/80">
                {t.auth.otpHint}{" "}
                <span className="font-semibold">{storedPhone ?? phone}</span>
              </p>
            </div>

            <div className="p-8">
              {/* Dev hint */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-light/30 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber/20 text-amber-dark">
                  <Shield size={16} />
                </span>
                <p className="text-xs font-medium text-amber-dark">{t.auth.devOtp}</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <Input
                  label={t.auth.otpCode}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  inputMode="numeric"
                  className="text-center text-2xl tracking-[0.5em]"
                  required
                />
                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-danger">
                    {error}
                  </div>
                )}
                <Button type="submit" size="lg" loading={loading}>
                  {t.auth.verify}
                  {!loading && <ArrowRight size={16} />}
                </Button>
              </form>

              <button
                type="button"
                onClick={() => router.push("/connexion")}
                className="mt-4 w-full text-center text-sm text-mid-gray hover:text-teal"
              >
                ← {t.common.back}
              </button>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // ── Phone Step ───────────────────────────────────────────────────────────────
  return (
    <PageShell>
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-teal-wash/40 to-off-white px-4 py-16">
        <div className="surface-card w-full max-w-md overflow-hidden shadow-elevated">
          {/* Header */}
          <div className="border-b border-light-border/60 px-8 py-6">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-center text-2xl font-semibold tracking-tight text-charcoal">
              {t.auth.login}
            </h1>
            <p className="mt-1 text-center text-sm text-mid-gray">{t.auth.loginHint}</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label={t.auth.phone}
                placeholder="+213 6XX XX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-danger">{error}</div>
              )}
              <Button type="submit" size="lg" loading={loading}>
                {t.auth.login}
                {!loading && <ArrowRight size={16} />}
              </Button>
            </form>

            {/* Demo quick-access */}
            <div className="mt-8">
              <div className="flex items-center gap-3 text-xs text-mid-gray">
                <div className="flex-1 border-t border-light-border" />
                <span className="font-medium uppercase tracking-wider">Démo v0</span>
                <div className="flex-1 border-t border-light-border" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {DEMO_ACCOUNTS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    disabled={loading}
                    onClick={() => quickLogin(demo)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-light-border bg-off-white/60 px-3 py-3.5 text-center transition-all hover:border-teal/40 hover:bg-teal-wash/40 disabled:opacity-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-xs font-bold text-teal">
                      {demo.role === "FREELANCER" ? "F" : "C"}
                    </span>
                    <span className="text-xs font-semibold text-charcoal">{demo.label}</span>
                    <span className="text-[10px] text-mid-gray">Accès direct →</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-mid-gray">
              {t.auth.noAccount}{" "}
              <Link href="/inscription" className="font-semibold text-teal hover:underline">
                {t.auth.register}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
