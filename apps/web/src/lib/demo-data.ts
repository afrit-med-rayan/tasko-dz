export type OrderStatus = "ACTIVE" | "DELIVERED" | "COMPLETED" | "PENDING_PAYMENT";

export interface DemoOrder {
  id: string;
  clientName: string;
  freelancerName: string;
  service: string;
  amountDzd: number;
  status: OrderStatus;
  date: string;
}

export const FREELANCER_DEMO = {
  balance: 28500,
  inEscrow: 12000,
  activeOrders: 3,
  pendingDelivery: 1,
  rating: 4.9,
  reviewCount: 47,
  completionRate: 96,
  orders: [
    {
      id: "o1",
      clientName: "Nadia Khelifi",
      freelancerName: "Yacine Bensalem",
      service: "Logo professionnel + fichiers sources",
      amountDzd: 3500,
      status: "ACTIVE" as OrderStatus,
      date: "2026-06-08",
    },
    {
      id: "o2",
      clientName: "Karim M.",
      freelancerName: "Yacine Bensalem",
      service: "Carte de visite + papeterie",
      amountDzd: 2500,
      status: "DELIVERED" as OrderStatus,
      date: "2026-06-05",
    },
    {
      id: "o3",
      clientName: "Sonia B.",
      freelancerName: "Yacine Bensalem",
      service: "Logo professionnel + fichiers sources",
      amountDzd: 3500,
      status: "COMPLETED" as OrderStatus,
      date: "2026-05-28",
    },
  ] satisfies DemoOrder[],
  services: [
    { id: "s1", title: "Logo professionnel + fichiers sources", priceDzd: 3500, orders: 28 },
    { id: "s2", title: "Carte de visite + papeterie", priceDzd: 2500, orders: 14 },
  ],
};

export const CLIENT_DEMO = {
  activeOrders: 2,
  completedOrders: 5,
  totalSpent: 18700,
  orders: [
    {
      id: "o1",
      clientName: "Nadia Khelifi",
      freelancerName: "Yacine Bensalem",
      service: "Logo professionnel + fichiers sources",
      amountDzd: 3500,
      status: "ACTIVE" as OrderStatus,
      date: "2026-06-08",
    },
    {
      id: "o4",
      clientName: "Nadia Khelifi",
      freelancerName: "Amina Khelifi",
      service: "Site vitrine responsive",
      amountDzd: 15000,
      status: "PENDING_PAYMENT" as OrderStatus,
      date: "2026-06-09",
    },
    {
      id: "o5",
      clientName: "Nadia Khelifi",
      freelancerName: "Sara Meziane",
      service: "Article de blog SEO",
      amountDzd: 2500,
      status: "COMPLETED" as OrderStatus,
      date: "2026-05-15",
    },
  ] satisfies DemoOrder[],
};
