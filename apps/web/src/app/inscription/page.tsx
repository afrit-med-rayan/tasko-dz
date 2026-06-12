"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Shield, Briefcase, UserCircle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const TRUST_ITEMS = [
  "Paiements 100% DZD",
  "Escrow sécurisé sur chaque commande",
  "10% commission seulement",
];

export default function RegisterPage() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"FREELANCER" | "CLIENT">(
    (searchParams.get("role") as "FREELANCER" | "CLIENT") ?? "CLIENT"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Erreur");
      sessionStorage.setItem("tasko-phone", phone);
      sessionStorage.setItem("tasko-role", role);
      router.push("/connexion?step=otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

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
              {t.auth.register}
            </h1>
            <p className="mt-1 text-center text-sm text-mid-gray">
              Algeria&apos;s first trusted freelance marketplace
            </p>
          </div>

          <div className="p-8">
            {/* Role selector */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-charcoal">Je suis…</p>
              <div className="grid grid-cols-2 gap-3">
                {(["CLIENT", "FREELANCER"] as const).map((r) => {
                  const Icon = r === "FREELANCER" ? Briefcase : UserCircle;
                  const isSelected = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-center transition-all ${
                        isSelected
                          ? "border-teal bg-teal-wash/60 shadow-sm"
                          : "border-light-border bg-off-white/50 hover:border-teal/30"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          isSelected ? "bg-teal text-white" : "bg-white text-mid-gray"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-teal-dark" : "text-dark-gray"
                        }`}
                      >
                        {r === "FREELANCER" ? t.auth.roleFreelancer : t.auth.roleClient}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t.auth.name}
                placeholder="Yacine Bensalem"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <Button type="submit" size="lg" loading={loading} className="mt-2">
                {t.auth.submit}
                {!loading && <ArrowRight size={16} />}
              </Button>
            </form>

            {/* Trust badges */}
            <div className="mt-6 space-y-2 rounded-xl bg-teal-wash/50 px-4 py-3">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Shield size={13} className="shrink-0 text-teal" />
                  <span className="text-xs text-teal-dark">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-mid-gray">
              {t.auth.alreadyAccount}{" "}
              <Link href="/connexion" className="font-semibold text-teal hover:underline">
                {t.auth.login}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
