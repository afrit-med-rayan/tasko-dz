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

// Demo accounts — no API needed
const DEMO_ACCOUNTS = [
  {
    label: "Freelancer Demo",
    phone: "+213655000001",
    role: "FREELANCER",
    name: "Yacine Bensalem",
    dashboard: "/freelancer/dashboard",
  },
  {
    label: "Client Demo",
    phone: "+213655000002",
    role: "CLIENT",
    name: "Nadia Khelifi",
    dashboard: "/client/dashboard",
  },
];

const DEV_OTP = "1234";

export default function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOtpStep = searchParams.get("step") === "otp";

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — send OTP (mock: just navigate to OTP step)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { setError("Numéro requis."); return; }
    setError("");
    sessionStorage.setItem("tasko-phone", phone);
    router.push("/connexion?step=otp");
  };

  // Step 2 — verify OTP (mock: accept "1234")
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp !== DEV_OTP) {
      setError("Code incorrect. Utilisez 1234 pour la démo.");
      return;
    }
    const storedPhone = sessionStorage.getItem("tasko-phone") ?? phone;
    const demo = DEMO_ACCOUNTS.find((d) => d.phone === storedPhone);
    const role = demo?.role ?? sessionStorage.getItem("tasko-role") ?? "CLIENT";
    const name = demo?.name ?? "Utilisateur";
    localStorage.setItem("tasko-token", `mock-token-${Date.now()}`);
    localStorage.setItem("tasko-role", role);
    localStorage.setItem("tasko-user", JSON.stringify({ name, role }));
    router.push(role === "FREELANCER" ? "/freelancer/dashboard" : "/client/dashboard");
  };

  // Quick demo login — 1 click
  const quickLogin = (demo: (typeof DEMO_ACCOUNTS)[0]) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("tasko-token", `mock-token-${Date.now()}`);
      localStorage.setItem("tasko-role", demo.role);
      localStorage.setItem("tasko-user", JSON.stringify({ name: demo.name, role: demo.role }));
      router.push(demo.dashboard);
    }, 400);
  };

  const storedPhone =
    typeof globalThis.window !== "undefined"
      ? sessionStorage.getItem("tasko-phone")
      : "";

  // ── OTP Step ──────────────────────────────────────────────────────────────
  if (isOtpStep) {
    return (
      <PageShell>
        <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-teal-wash/40 to-off-white px-4 py-16">
          <div className="surface-card w-full max-w-md overflow-hidden shadow-elevated">
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
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-danger">{error}</div>
                )}
                <Button type="submit" size="lg">
                  {t.auth.verify}
                  <ArrowRight size={16} />
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

  // ── Phone Step ────────────────────────────────────────────────────────────
  return (
    <PageShell>
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-teal-wash/40 to-off-white px-4 py-16">
        <div className="surface-card w-full max-w-md overflow-hidden shadow-elevated">
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
              <Button type="submit" size="lg">
                {t.auth.login}
                <ArrowRight size={16} />
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
