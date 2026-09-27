"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { DEMO_USERS } from "@/lib/i18n/translations";

const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    partnerName: "Yacine Bensalem",
    role: "Freelancer Design",
    lastMessage: "Voici une première proposition. Dites-moi ce que vous en pensez.",
    lastTime: "14:30",
    unread: 1,
    orderId: "o1",
    messages: [
      { from: "client", text: "Bonjour Yacine, j'ai passé une commande pour mon logo.", time: "09:00" },
      { from: "freelancer", text: "Bonjour Nadia ! J'ai bien reçu votre brief, je commence à travailler dessus.", time: "09:15" },
      { from: "client", text: "Super, n'oubliez pas le style minimaliste.", time: "09:20" },
      { from: "freelancer", text: "Voici une première proposition. Dites-moi ce que vous en pensez.", time: "14:30" },
    ],
  },
  {
    id: "c2",
    partnerName: "Sara Meziane",
    role: "Freelancer Redaction",
    lastMessage: "L'article est pret, je vais le livrer ce soir.",
    lastTime: "Hier",
    unread: 0,
    orderId: "o4",
    messages: [
      { from: "client", text: "Bonjour Sara, j'ai besoin d'un article sur l'entrepreneuriat.", time: "10:00" },
      { from: "freelancer", text: "Parfait, j'ai bien lu le brief. Je commence.", time: "10:30" },
      { from: "freelancer", text: "L'article est pret, je vais le livrer ce soir.", time: "17:00" },
    ],
  },
];

export default function ClientMessagesPage() {
  const user = DEMO_USERS.client;
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState(activeConv.messages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "client", text: input, time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <DashboardShell role="client" userName={user.name}>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-charcoal">Messages</h1>
        <p className="text-sm text-mid-gray">Vos conversations avec les freelancers</p>
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
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-light-border/50 hover:bg-off-white/60 transition-colors ${activeConv.id === conv.id ? "bg-amber-light/20" : ""}`}
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
                  <p className="text-[10px] text-teal mb-0.5">{conv.role}</p>
                  <p className="text-xs text-mid-gray truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-light-border px-5 py-3.5">
            <Avatar name={activeConv.partnerName} size="sm" />
            <div>
              <p className="text-sm font-bold text-charcoal">{activeConv.partnerName}</p>
              <p className="text-xs text-mid-gray">{activeConv.role}</p>
            </div>
            <Link
              href={`/client/orders/${activeConv.orderId}`}
              className="ml-auto text-xs font-semibold text-teal hover:underline"
            >
              Voir la commande
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "client"
                    ? "bg-amber text-white rounded-br-sm"
                    : "bg-off-white text-charcoal rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`mt-1 text-[10px] ${msg.from === "client" ? "text-white/60 text-right" : "text-mid-gray"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

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
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber text-white hover:bg-amber-dark transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
