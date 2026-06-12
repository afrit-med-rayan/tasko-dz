// ─── Types ────────────────────────────────────────────────────────────────────

export interface FreelancerSummary {
  id: string;
  username: string;
  name: string;
  specialty: string;
  city: string;
  isVerifiedFreelancer: boolean;
  averageRating: number;
  totalReviews: number;
  startingPriceDzd: number;
  completedOrdersCount: number;
}

export interface FreelancerProfile extends FreelancerSummary {
  category: string;
  bio: string;
  languages: string[];
  isVerifiedIdentity: boolean;
  responseRate: number;
  portfolioUrls: string[];
  services: ServiceDetail[];
}

export interface ServiceDetail {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  priceDzd: number;
  deliveryDays: number;
  revisionCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  nameFr: string;
  nameAr: string;
  icon: string;
  freelancerCount: number;
}

// ─── Static mock data ─────────────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: "design_graphique", nameFr: "Design graphique", nameAr: "تصميم جرافيك", icon: "palette", freelancerCount: 142 },
  { id: "dev_web", nameFr: "Développement web", nameAr: "تطوير الويب", icon: "code", freelancerCount: 97 },
  { id: "video_animation", nameFr: "Vidéo & Animation", nameAr: "فيديو ورسوم متحركة", icon: "video", freelancerCount: 68 },
  { id: "redaction", nameFr: "Rédaction", nameAr: "كتابة المحتوى", icon: "pen", freelancerCount: 61 },
  { id: "traduction", nameFr: "Traduction", nameAr: "ترجمة", icon: "languages", freelancerCount: 54 },
  { id: "social_media", nameFr: "Social media", nameAr: "وسائل التواصل", icon: "share", freelancerCount: 83 },
];

const MOCK_SERVICES: Record<string, ServiceDetail & { freelancer: FreelancerSummary }> = {
  s1: {
    id: "s1", freelancerId: "f1",
    title: "Logo professionnel + fichiers sources",
    description: "Création d'un logo unique avec 3 propositions, fichiers sources AI/PSD/PDF et guide d'utilisation des couleurs. Idéal pour les startups et PME algériennes qui veulent une identité visuelle professionnelle.",
    category: "design_graphique", subcategory: "logo_identite",
    priceDzd: 3500, deliveryDays: 3, revisionCount: 3,
    tags: ["logo", "branding", "identite"],
    freelancer: {
      id: "f1", username: "yacine-bensalem", name: "Yacine Bensalem",
      specialty: "Design graphique", city: "Alger",
      isVerifiedFreelancer: true, averageRating: 4.9,
      totalReviews: 47, startingPriceDzd: 2500, completedOrdersCount: 52,
    },
  },
  s2: {
    id: "s2", freelancerId: "f1",
    title: "Carte de visite + papeterie",
    description: "Design carte de visite recto-verso, en-tête de lettre et signature email cohérents avec votre identité visuelle. Fichiers prêts à imprimer inclus.",
    category: "design_graphique",
    priceDzd: 2500, deliveryDays: 2, revisionCount: 2,
    tags: ["print", "papeterie", "carte"],
    freelancer: {
      id: "f1", username: "yacine-bensalem", name: "Yacine Bensalem",
      specialty: "Design graphique", city: "Alger",
      isVerifiedFreelancer: true, averageRating: 4.9,
      totalReviews: 47, startingPriceDzd: 2500, completedOrdersCount: 52,
    },
  },
  s3: {
    id: "s3", freelancerId: "f2",
    title: "Site vitrine responsive (5 pages)",
    description: "Site web professionnel responsive, optimisé mobile, avec formulaire de contact intégré. Développé avec React/Next.js. Hébergement et nom de domaine non inclus.",
    category: "dev_web",
    priceDzd: 15000, deliveryDays: 7, revisionCount: 3,
    tags: ["website", "responsive", "nextjs"],
    freelancer: {
      id: "f2", username: "amina-khelifi", name: "Amina Khelifi",
      specialty: "Développement web", city: "Oran",
      isVerifiedFreelancer: true, averageRating: 4.8,
      totalReviews: 31, startingPriceDzd: 8000, completedOrdersCount: 38,
    },
  },
  s4: {
    id: "s4", freelancerId: "f3",
    title: "Montage vidéo publicitaire (60s)",
    description: "Montage professionnel avec musique libre de droits, sous-titres animés et export HD/4K. Idéal pour publicités Instagram, Facebook et YouTube.",
    category: "video_animation",
    priceDzd: 6000, deliveryDays: 4, revisionCount: 2,
    tags: ["montage", "pub", "reels"],
    freelancer: {
      id: "f3", username: "karim-hadjadj", name: "Karim Hadjadj",
      specialty: "Vidéo & Animation", city: "Constantine",
      isVerifiedFreelancer: false, averageRating: 4.7,
      totalReviews: 18, startingPriceDzd: 5000, completedOrdersCount: 22,
    },
  },
  s5: {
    id: "s5", freelancerId: "f4",
    title: "Article de blog SEO (800 mots)",
    description: "Rédaction d'article optimisé SEO en français ou arabe, avec recherche de mots-clés incluse. Structuré H1/H2/H3, méta-description fournie.",
    category: "redaction",
    priceDzd: 2500, deliveryDays: 2, revisionCount: 2,
    tags: ["seo", "blog", "contenu"],
    freelancer: {
      id: "f4", username: "sara-meziane", name: "Sara Meziane",
      specialty: "Rédaction", city: "Annaba",
      isVerifiedFreelancer: true, averageRating: 4.9,
      totalReviews: 24, startingPriceDzd: 2000, completedOrdersCount: 29,
    },
  },
};

const MOCK_PROFILES: Record<string, FreelancerProfile> = {
  "yacine-bensalem": {
    id: "f1", username: "yacine-bensalem", name: "Yacine Bensalem",
    specialty: "Design graphique", category: "design_graphique", city: "Alger",
    bio: "Designer graphique avec 5 ans d'expérience. Spécialisé en identité visuelle, logos et branding pour startups algériennes. J'ai travaillé avec plus de 50 clients satisfaits à travers l'Algérie.",
    languages: ["ar", "fr"],
    isVerifiedFreelancer: true, isVerifiedIdentity: true,
    averageRating: 4.9, totalReviews: 47, completedOrdersCount: 52, responseRate: 98,
    startingPriceDzd: 2500, portfolioUrls: [],
    services: [
      {
        id: "s1", freelancerId: "f1",
        title: "Logo professionnel + fichiers sources",
        description: "Création d'un logo unique avec 3 propositions, fichiers sources AI/PSD/PDF et guide d'utilisation des couleurs.",
        category: "design_graphique", subcategory: "logo_identite",
        priceDzd: 3500, deliveryDays: 3, revisionCount: 3,
        tags: ["logo", "branding", "identite"],
      },
      {
        id: "s2", freelancerId: "f1",
        title: "Carte de visite + papeterie",
        description: "Design carte de visite, en-tête et signature email cohérents avec votre identité visuelle.",
        category: "design_graphique",
        priceDzd: 2500, deliveryDays: 2, revisionCount: 2,
        tags: ["print", "papeterie"],
      },
    ],
  },
  "amina-khelifi": {
    id: "f2", username: "amina-khelifi", name: "Amina Khelifi",
    specialty: "Développement web", category: "dev_web", city: "Oran",
    bio: "Développeuse full-stack avec 4 ans d'expérience. Sites vitrines, e-commerce et applications web sur mesure pour le marché algérien. Spécialisée React, Next.js et Node.js.",
    languages: ["ar", "fr", "en"],
    isVerifiedFreelancer: true, isVerifiedIdentity: true,
    averageRating: 4.8, totalReviews: 31, completedOrdersCount: 38, responseRate: 95,
    startingPriceDzd: 8000, portfolioUrls: [],
    services: [
      {
        id: "s3", freelancerId: "f2",
        title: "Site vitrine responsive (5 pages)",
        description: "Site web professionnel responsive, optimisé mobile, formulaire de contact intégré.",
        category: "dev_web",
        priceDzd: 15000, deliveryDays: 7, revisionCount: 3,
        tags: ["website", "responsive"],
      },
    ],
  },
  "karim-hadjadj": {
    id: "f3", username: "karim-hadjadj", name: "Karim Hadjadj",
    specialty: "Vidéo & Animation", category: "video_animation", city: "Constantine",
    bio: "Monteur vidéo et motion designer avec 3 ans d'expérience. Publicités, reels Instagram et vidéos corporate pour entreprises algériennes.",
    languages: ["ar", "fr"],
    isVerifiedFreelancer: false, isVerifiedIdentity: true,
    averageRating: 4.7, totalReviews: 18, completedOrdersCount: 22, responseRate: 92,
    startingPriceDzd: 5000, portfolioUrls: [],
    services: [
      {
        id: "s4", freelancerId: "f3",
        title: "Montage vidéo publicitaire (60s)",
        description: "Montage professionnel avec musique libre de droits, sous-titres et export HD/4K.",
        category: "video_animation",
        priceDzd: 6000, deliveryDays: 4, revisionCount: 2,
        tags: ["montage", "pub"],
      },
    ],
  },
  "sara-meziane": {
    id: "f4", username: "sara-meziane", name: "Sara Meziane",
    specialty: "Rédaction", category: "redaction", city: "Annaba",
    bio: "Rédactrice web bilingue AR/FR. Articles SEO, descriptions produits et contenu pour réseaux sociaux. 100% des clients recommandent mon travail.",
    languages: ["ar", "fr"],
    isVerifiedFreelancer: true, isVerifiedIdentity: true,
    averageRating: 4.9, totalReviews: 24, completedOrdersCount: 29, responseRate: 99,
    startingPriceDzd: 2000, portfolioUrls: [],
    services: [
      {
        id: "s5", freelancerId: "f4",
        title: "Article de blog SEO (800 mots)",
        description: "Rédaction d'article optimisé SEO en français ou arabe, avec recherche de mots-clés incluse.",
        category: "redaction",
        priceDzd: 2500, deliveryDays: 2, revisionCount: 2,
        tags: ["seo", "blog"],
      },
    ],
  },
};

const MOCK_REVIEWS: Record<string, { id: string; clientName: string; rating: number; text: string; createdAt: string }[]> = {
  f1: [
    { id: "r1", clientName: "Nadia Khelifi", rating: 5, text: "Logo magnifique pour ma boutique. Yacine est très professionnel et à l'écoute.", createdAt: "2026-06-01T11:00:00Z" },
    { id: "r2", clientName: "Mohamed R.", rating: 5, text: "Excellent travail, logo parfait. Livraison rapide et professionnelle.", createdAt: "2026-05-12T10:00:00Z" },
    { id: "r3", clientName: "Fatima B.", rating: 5, text: "Yacine a su comprendre ma vision dès le premier brief. Je recommande vivement.", createdAt: "2026-04-28T14:30:00Z" },
  ],
  f2: [
    { id: "r4", clientName: "Rachid M.", rating: 5, text: "Site livré à temps, très réactif aux modifications. Parfait pour mon activité.", createdAt: "2026-05-01T09:15:00Z" },
    { id: "r5", clientName: "Soraya D.", rating: 4, text: "Bon travail dans l'ensemble, quelques ajustements demandés mais très coopérative.", createdAt: "2026-04-10T14:00:00Z" },
  ],
  f3: [
    { id: "r6", clientName: "Ali H.", rating: 5, text: "Vidéo de qualité professionnelle, exactement ce que je cherchais pour ma pub.", createdAt: "2026-05-20T10:00:00Z" },
  ],
  f4: [
    { id: "r7", clientName: "Leila B.", rating: 5, text: "Article SEO de très haute qualité. Mes positions Google ont nettement progressé.", createdAt: "2026-05-15T08:00:00Z" },
    { id: "r8", clientName: "Yazid M.", rating: 5, text: "Excellent contenu, livré avant le délai. Sara est une vraie pro.", createdAt: "2026-04-22T11:00:00Z" },
  ],
};

// ─── Data access functions (replaces API calls) ────────────────────────────────

export function getFeaturedFreelancers(): FreelancerSummary[] {
  return Object.values(MOCK_PROFILES)
    .filter((f) => f.isVerifiedFreelancer)
    .slice(0, 4)
    .map(({ id, username, name, specialty, city, isVerifiedFreelancer, averageRating, totalReviews, startingPriceDzd, completedOrdersCount }) =>
      ({ id, username, name, specialty, city, isVerifiedFreelancer, averageRating, totalReviews, startingPriceDzd, completedOrdersCount })
    );
}

export function searchFreelancers(params?: {
  q?: string;
  category?: string;
}): { data: FreelancerSummary[]; meta: { total: number } } {
  let results = Object.values(MOCK_PROFILES);

  if (params?.q) {
    const q = params.q.toLowerCase();
    results = results.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.specialty.toLowerCase().includes(q) ||
        f.bio.toLowerCase().includes(q)
    );
  }
  if (params?.category) {
    results = results.filter((f) => f.category === params.category);
  }

  const data = results.map(({ id, username, name, specialty, city, isVerifiedFreelancer, averageRating, totalReviews, startingPriceDzd, completedOrdersCount }) =>
    ({ id, username, name, specialty, city, isVerifiedFreelancer, averageRating, totalReviews, startingPriceDzd, completedOrdersCount })
  );
  return { data, meta: { total: data.length } };
}

export function getFreelancerPublic(username: string): FreelancerProfile | undefined {
  return MOCK_PROFILES[username];
}

export function getFreelancerReviews(freelancerId: string) {
  const data = MOCK_REVIEWS[freelancerId] ?? [];
  const avg = data.length ? data.reduce((s, r) => s + r.rating, 0) / data.length : 0;
  return { data, averageRating: avg };
}

export function getService(id: string) {
  return MOCK_SERVICES[id];
}

export function getCategories(): Category[] {
  return MOCK_CATEGORIES;
}

// ─── Formatting helper ────────────────────────────────────────────────────────

export function formatDzd(amount: number, locale: "fr" | "ar" = "fr"): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-DZ" : "fr-DZ").format(amount);
  return `${formatted} DZD`;
}
