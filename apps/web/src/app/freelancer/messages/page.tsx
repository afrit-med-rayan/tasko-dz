"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Clock, Send, ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { DEMO_USERS } from "@/lib/i18n/translations";

const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    partnerName: "Nadia Khelifi",
    lastMessage: "Merci, j'ai bien recu les fichiers. Super travail !",
    lastTime: "Il y a 2h",
    unread: 1,
    orderId: "o1",
    messages: [
      { from: "client", text: "Bonjour, pouvez-vous me montrer une première ébauche ?", time: "10:00" },
      { from: "freelancer", text: "Bien sûr, je vous envoie ça dans la journée.", time: "10:15" },
      { from: "client", text: "Parfait, merci !", time: "10:16" },
      { from: "freelancer", text: "Voici une première proposition : [lien]. Dites-moi ce que vous en pensez.", time: "14:30" },
      { from: "client", text: "Merci, j'ai bien recu les fichiers. Super travail !", time: "16:45" },
    ],
  },
  {
    id: "c2",
    partnerName: "Karim M.",
    lastMessage: "Quand sera livré mon logo ?",
    lastTime: "Hier",
    unread: 0,
    orderId: "o2",
    messages: [
      { from: "client", text: "Bonjour, j'ai passé ma commande hier.", time: "09:00" },
      { from: "freelancer", text: "Bonjour ! Je travaille dessus, livraison prévue demain.", time: "09:30" },
      { from: "client", text: "Quand sera livré mon logo ?", time: "18:00" },
    ],
  },
];

export default function FreelancerMessagesPage() {
  const user = DEMO_USERS.freelancer;
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(activeConv.messages);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "freelancer", text: input, time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <DashboardShell role="freelancer" userName={user.name}>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-charcoal">Messages</h1>
        <p className="text-sm text-mid-gray">Vos conversations avec les clients</p>
      </div>

      <div className="surface-card flex overflow-hidden" style={{ height: "calc(100vh - 220px)", minHeight: "480px" }}>
        {/* Conversations list */}
        <div className="w-72 shrink-0 border-r border-light-border">
          <div className="p-4 border-b border-light-border">
            <p className="text-xs font-bold uppercase tracking-wider text-mid-gray">Conversations</p>
          </div>
          <div className="overflow-y-auto h-full">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => { setActiveConv(conv); setMessages(conv.messages); }}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-light-border/50 hover:bg-off-white/60 transition-colors ${activeConv.id === conv.id ? "bg-teal-wash/40" : ""}`}
              >
                <div className="relative shrink-0">
                  <Avatar name={conv.partnerName} size="sm" />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-amber text-[9px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-charcoal truncate">{conv.partnerName}</p>
                    <p className="text-[10px] text-mid-gray shrink-0">{conv.lastTime}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-mid-gray truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-light-border px-5 py-3.5">
            <Avatar name={activeConv.partnerName} size="sm" />
            <div>
              <p className="text-sm font-bold text-charcoal">{activeConv.partnerName}</p>
              <p className="text-xs text-mid-gray">Commande #{activeConv.orderId}</p>
            </div>
            <Link
              href={`/freelancer/orders/${activeConv.orderId}`}
              className="ml-auto text-xs font-semibold text-teal hover:underline"
            >
              Voir la commande
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "freelancer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "freelancer"
                    ? "bg-teal text-white rounded-br-sm"
                    : "bg-off-white text-charcoal rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`mt-1 text-[10px] ${msg.from === "freelancer" ? "text-white/60 text-right" : "text-mid-gray"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-light-border p-4 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ecrivez un message..."
              className="flex-1 rounded-xl border border-light-border bg-off-white/60 px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-white hover:bg-teal-dark transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
