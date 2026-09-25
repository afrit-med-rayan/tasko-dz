"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Users, ShoppingCart, Activity, CheckCircle, ArrowRightLeft, CreditCard } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { formatDzd } from "@/lib/api";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "users">("orders");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:4000/api/v1/orders", {
        headers: { "x-user-id": "admin", "x-user-role": "ADMIN" }
      }).then(res => res.json()),
      fetch("http://localhost:4000/api/v1/demo/freelancers").then(res => res.json())
    ])
    .then(([ordersData, freelancersData]) => {
      setOrders(ordersData || []);
      setUsers([
        ...freelancersData.map((f: any) => ({ ...f, role: "FREELANCER" })),
        { id: "c1", name: "Nadia Khelifi", city: "Alger", role: "CLIENT", isVerifiedIdentity: true }
      ]);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + (o.priceDzd || 0) * 0.1, 0);
  const totalVolume = orders.reduce((acc, o) => acc + (o.priceDzd || 0), 0);
  const completedVolume = orders.filter(o => o.status === "COMPLETED").reduce((acc, o) => acc + (o.priceDzd || 0), 0);
  const escrowVolume = orders.filter(o => o.status === "ACTIVE" || o.status === "DELIVERED" || o.status === "REVISION").reduce((acc, o) => acc + (o.priceDzd || 0), 0);
  const disputesCount = orders.filter(o => o.status === "DISPUTE").length;

  return (
    <DashboardShell role="client" userName="Admin">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Panel Administrateur</h1>
          <p className="text-sm text-mid-gray mt-1">Vue d'ensemble et gestion de la plateforme Tasko</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button className="bg-white border border-light-border px-4 py-2 rounded-xl text-sm font-semibold hover:bg-off-white transition-colors">
            Exporter CSV
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        <div className="surface-card p-5 border-l-4 border-teal">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider">Revenus Tasko</span>
            <Activity size={18} className="text-teal" />
          </div>
          <span className="text-2xl font-bold text-charcoal">{formatDzd(totalRevenue, "fr")}</span>
        </div>
        
        <div className="surface-card p-5 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider">Volume Total</span>
            <ArrowRightLeft size={18} className="text-blue-500" />
          </div>
          <span className="text-2xl font-bold text-charcoal">{formatDzd(totalVolume, "fr")}</span>
        </div>

        <div className="surface-card p-5 border-l-4 border-amber">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider">En Escrow</span>
            <ShieldAlert size={18} className="text-amber" />
          </div>
          <span className="text-2xl font-bold text-charcoal">{formatDzd(escrowVolume, "fr")}</span>
        </div>

        <div className="surface-card p-5 border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider">Vol. Complété</span>
            <CheckCircle size={18} className="text-green-500" />
          </div>
          <span className="text-2xl font-bold text-charcoal">{formatDzd(completedVolume, "fr")}</span>
        </div>

        <div className="surface-card p-5 border-l-4 border-red-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider">Litiges Actifs</span>
            <ShieldAlert size={18} className={disputesCount > 0 ? "text-red-500" : "text-mid-gray"} />
          </div>
          <span className="text-2xl font-bold text-charcoal">{disputesCount}</span>
        </div>
      </div>

      <div className="mb-6 flex gap-4 border-b border-light-border pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-2 font-medium text-sm transition-colors ${
            activeTab === "orders" ? "border-b-2 border-teal text-teal-dark" : "text-mid-gray hover:text-charcoal"
          }`}
        >
          Gestion des transactions
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 font-medium text-sm transition-colors ${
            activeTab === "users" ? "border-b-2 border-teal text-teal-dark" : "text-mid-gray hover:text-charcoal"
          }`}
        >
          Gestion des utilisateurs ({users.length})
        </button>
      </div>

      {activeTab === "orders" && (
        <div className="surface-card overflow-hidden">
          <div className="p-5 border-b border-light-border flex justify-between items-center bg-off-white/40">
            <h2 className="font-semibold text-charcoal flex items-center gap-2">
              <ShoppingCart size={18} className="text-teal" /> Transactions & Commandes
            </h2>
            <div className="flex gap-2">
              <select className="text-sm border border-light-border rounded-lg px-3 py-1.5 bg-white outline-none focus:border-teal">
                <option>Tous les statuts</option>
                <option>Actives</option>
                <option>En Escrow</option>
                <option>Complétées</option>
                <option>Litiges</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white border-b border-light-border">
                <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-mid-gray">
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Service & Freelancer</th>
                  <th className="px-5 py-3.5">Client</th>
                  <th className="px-5 py-3.5">Prix (Commission)</th>
                  <th className="px-5 py-3.5">Statut</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-mid-gray">Chargement des transactions...</td></tr>
                ) : orders.map(order => (
                  <tr key={order.id} className="border-b border-light-border/50 hover:bg-off-white/30 transition-colors">
                    <td className="px-5 py-4 font-medium text-charcoal">#{order.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-charcoal truncate max-w-[150px]">{order.serviceId}</div>
                      <div className="text-xs text-mid-gray">{order.freelancerId}</div>
                    </td>
                    <td className="px-5 py-4 text-dark-gray">{order.clientId}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-charcoal">{formatDzd(order.priceDzd, "fr")}</div>
                      <div className="text-xs text-teal">+{formatDzd(order.priceDzd * 0.1, "fr")} fee</div>
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-teal text-xs font-semibold px-3 py-1.5 rounded-lg border border-teal/20 hover:bg-teal-wash transition-colors">
                        Inspecter
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && orders.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-mid-gray">Aucune commande sur la plateforme.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="surface-card overflow-hidden">
          <div className="p-5 border-b border-light-border flex justify-between items-center bg-off-white/40">
            <h2 className="font-semibold text-charcoal flex items-center gap-2">
              <Users size={18} className="text-teal" /> Utilisateurs Inscrits
            </h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Rechercher..." className="text-sm border border-light-border rounded-lg px-3 py-1.5 w-64 bg-white outline-none focus:border-teal" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white border-b border-light-border">
                <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-mid-gray">
                  <th className="px-5 py-3.5">Nom & Role</th>
                  <th className="px-5 py-3.5">Ville</th>
                  <th className="px-5 py-3.5">Statut Vérification</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-mid-gray">Chargement des utilisateurs...</td></tr>
                ) : users.map(u => (
                  <tr key={u.id} className="border-b border-light-border/50 hover:bg-off-white/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-charcoal">{u.name}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-wide mt-1 inline-block px-2 py-0.5 rounded-md ${
                        u.role === "FREELANCER" ? "bg-teal-wash text-teal-dark" : "bg-amber-light/30 text-amber-dark"
                      }`}>
                        {u.role}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-dark-gray">{u.city}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        {u.isVerifiedIdentity ? (
                          <span className="text-teal flex items-center gap-1"><CheckCircle size={14} /> ID Verifié</span>
                        ) : (
                          <span className="text-mid-gray">ID Non verifié</span>
                        )}
                        {u.isVerifiedFreelancer && (
                          <span className="ml-2 text-blue-500 flex items-center gap-1"><ShieldAlert size={14} /> Freelancer Pro</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-dark-gray text-xs font-semibold px-3 py-1.5 rounded-lg border border-light-border hover:bg-off-white transition-colors">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
