"use client";

import { useState } from "react";
import { User, Phone, MapPin, Shield, Bell, LogOut, CheckCircle } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { DEMO_USERS } from "@/lib/i18n/translations";

export default function ClientAccountPage() {
  const user = DEMO_USERS.client;
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell role="client" userName={user.name}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Mon Compte</h1>
        <p className="mt-1 text-sm text-mid-gray">Gerez vos informations personnelles et preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="surface-card p-6 text-center lg:col-span-1">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar name={user.name} size="xl" className="!h-24 !w-24 text-3xl shadow-md" />
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-teal flex items-center justify-center shadow">
                <CheckCircle size={14} className="text-white" />
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold text-charcoal">{user.name}</h2>
          <p className="text-sm text-mid-gray">Client Tasko</p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-wash px-3 py-1.5 text-xs font-bold text-teal-dark">
            <Shield size={13} />
            Compte verifie
          </div>
          <div className="mt-6 space-y-3 text-sm text-left">
            <div className="flex items-center gap-2.5 text-mid-gray">
              <Phone size={15} className="text-teal shrink-0" />
              <span>+213 6XX XX XX XX</span>
            </div>
            <div className="flex items-center gap-2.5 text-mid-gray">
              <MapPin size={15} className="text-teal shrink-0" />
              <span>{user.city}</span>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="space-y-6 lg:col-span-2">
          <div className="surface-card p-6">
            <h3 className="mb-5 text-base font-bold text-charcoal flex items-center gap-2">
              <User size={16} className="text-teal" />
              Informations personnelles
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-charcoal">Nom complet</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full rounded-xl border border-light-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-charcoal">Ville</label>
                  <input
                    type="text"
                    defaultValue={user.city}
                    className="w-full rounded-xl border border-light-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">Numero de telephone</label>
                <input
                  type="tel"
                  defaultValue="+213 6XX XX XX XX"
                  readOnly
                  className="w-full rounded-xl border border-light-border bg-off-white/60 px-4 py-2.5 text-sm text-mid-gray cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-mid-gray">Le numero de telephone ne peut pas etre modifie (identifiant de compte).</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                {saved && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                    <CheckCircle size={16} />
                    Modifications enregistrees
                  </div>
                )}
                <button
                  type="submit"
                  className="ml-auto rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-dark transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>

          {/* Notifications */}
          <div className="surface-card p-6">
            <h3 className="mb-5 text-base font-bold text-charcoal flex items-center gap-2">
              <Bell size={16} className="text-teal" />
              Notifications
            </h3>
            <div className="space-y-4">
              {[
                { label: "Mises a jour de commandes", desc: "Recevez une notification a chaque changement de statut", default: true },
                { label: "Messages freelancers", desc: "Soyez notifie des nouveaux messages", default: true },
                { label: "Offres et promotions", desc: "Recevez les promotions Tasko", default: false },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="text-xs text-mid-gray">{item.desc}</p>
                  </div>
                  <label className="relative shrink-0 cursor-pointer">
                    <input type="checkbox" defaultChecked={item.default} className="peer sr-only" />
                    <div className="h-6 w-10 rounded-full bg-light-border transition-colors peer-checked:bg-teal" />
                    <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="surface-card border-danger/20 p-6">
            <h3 className="mb-4 text-base font-bold text-danger">Zone sensible</h3>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-danger/30 px-4 py-2.5 text-sm font-semibold text-danger hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Se deconnecter
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
