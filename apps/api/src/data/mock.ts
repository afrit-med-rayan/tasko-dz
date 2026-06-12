export type UserRole = "CLIENT" | "FREELANCER" | "DUAL" | "ADMIN";

export interface Service {
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
  isActive: boolean;
}

export interface Freelancer {
  id: string;
  username: string;
  name: string;
  specialty: string;
  category: string;
  city: string;
  bio: string;
  languages: string[];
  profilePhotoUrl?: string;
  isVerifiedIdentity: boolean;
  isVerifiedFreelancer: boolean;
  averageRating: number;
  totalReviews: number;
  completedOrdersCount: number;
  responseRate: number;
  startingPriceDzd: number;
  services: Service[];
  portfolioUrls: string[];
}

export interface Review {
  id: string;
  freelancerId: string;
  clientName: string;
  rating: number;
  text: string;
  createdAt: string;
}

export const CATEGORIES = [
  { id: "design_graphique", nameFr: "Design graphique", nameAr: "تصميم جرافيك", icon: "palette", freelancerCount: 142 },
  { id: "video_animation", nameFr: "Vidéo & Animation", nameAr: "فيديو ورسوم متحركة", icon: "video", freelancerCount: 68 },
  { id: "traduction", nameFr: "Traduction", nameAr: "ترجمة", icon: "languages", freelancerCount: 54 },
  { id: "dev_web", nameFr: "Développement web", nameAr: "تطوير الويب", icon: "code", freelancerCount: 97 },
  { id: "social_media", nameFr: "Social media", nameAr: "وسائل التواصل", icon: "share", freelancerCount: 83 },
  { id: "redaction", nameFr: "Rédaction", nameAr: "كتابة المحتوى", icon: "pen", freelancerCount: 61 },
] as const;

const freelancers: Freelancer[] = [
  {
    id: "f1",
    username: "yacine-bensalem",
    name: "Yacine Bensalem",
    specialty: "Design graphique",
    category: "design_graphique",
    city: "Alger",
    bio: "Designer graphique avec 5 ans d'expérience. Spécialisé en identité visuelle, logos et branding pour startups algériennes.",
    languages: ["ar", "fr"],
    isVerifiedIdentity: true,
    isVerifiedFreelancer: true,
    averageRating: 4.9,
    totalReviews: 47,
    completedOrdersCount: 52,
    responseRate: 98,
    startingPriceDzd: 3500,
    portfolioUrls: [],
    services: [
      {
        id: "s1",
        freelancerId: "f1",
        title: "Logo professionnel + fichiers sources",
        description:
          "Création d'un logo unique avec 3 propositions, fichiers sources AI/PSD/PDF et guide d'utilisation des couleurs.",
        category: "design_graphique",
        subcategory: "logo_identite",
        priceDzd: 3500,
        deliveryDays: 3,
        revisionCount: 3,
        tags: ["logo", "branding", "identite"],
        isActive: true,
      },
      {
        id: "s2",
        freelancerId: "f1",
        title: "Carte de visite + papeterie",
        description: "Design carte de visite, en-tête et signature email cohérents avec votre identité visuelle.",
        category: "design_graphique",
        priceDzd: 2500,
        deliveryDays: 2,
        revisionCount: 2,
        tags: ["print", "papeterie"],
        isActive: true,
      },
    ],
  },
  {
    id: "f2",
    username: "amina-khelifi",
    name: "Amina Khelifi",
    specialty: "Développement web",
    category: "dev_web",
    city: "Oran",
    bio: "Développeuse full-stack. Sites vitrines, e-commerce et applications web sur mesure pour le marché algérien.",
    languages: ["ar", "fr", "en"],
    isVerifiedIdentity: true,
    isVerifiedFreelancer: true,
    averageRating: 4.8,
    totalReviews: 31,
    completedOrdersCount: 38,
    responseRate: 95,
    startingPriceDzd: 8000,
    portfolioUrls: [],
    services: [
      {
        id: "s3",
        freelancerId: "f2",
        title: "Site vitrine responsive",
        description: "Site web professionnel 5 pages, responsive, optimisé mobile, formulaire de contact intégré.",
        category: "dev_web",
        priceDzd: 15000,
        deliveryDays: 7,
        revisionCount: 3,
        tags: ["website", "responsive"],
        isActive: true,
      },
    ],
  },
  {
    id: "f3",
    username: "karim-hadjadj",
    name: "Karim Hadjadj",
    specialty: "Vidéo & Animation",
    category: "video_animation",
    city: "Constantine",
    bio: "Monteur vidéo et motion designer. Publicités, reels Instagram et vidéos corporate pour entreprises.",
    languages: ["ar", "fr"],
    isVerifiedIdentity: true,
    isVerifiedFreelancer: false,
    averageRating: 4.7,
    totalReviews: 18,
    completedOrdersCount: 22,
    responseRate: 92,
    startingPriceDzd: 5000,
    portfolioUrls: [],
    services: [
      {
        id: "s4",
        freelancerId: "f3",
        title: "Montage vidéo publicitaire (60s)",
        description: "Montage professionnel avec musique libre de droits, sous-titres et export HD/4K.",
        category: "video_animation",
        priceDzd: 6000,
        deliveryDays: 4,
        revisionCount: 2,
        tags: ["montage", "pub"],
        isActive: true,
      },
    ],
  },
  {
    id: "f4",
    username: "sara-meziane",
    name: "Sara Meziane",
    specialty: "Rédaction",
    category: "redaction",
    city: "Annaba",
    bio: "Rédactrice web bilingue AR/FR. Articles SEO, descriptions produits et contenu pour réseaux sociaux.",
    languages: ["ar", "fr"],
    isVerifiedIdentity: true,
    isVerifiedFreelancer: true,
    averageRating: 4.9,
    totalReviews: 24,
    completedOrdersCount: 29,
    responseRate: 99,
    startingPriceDzd: 2000,
    portfolioUrls: [],
    services: [
      {
        id: "s5",
        freelancerId: "f4",
        title: "Article de blog SEO (800 mots)",
        description: "Rédaction d'article optimisé SEO en français ou arabe, avec recherche de mots-clés incluse.",
        category: "redaction",
        priceDzd: 2500,
        deliveryDays: 2,
        revisionCount: 2,
        tags: ["seo", "blog"],
        isActive: true,
      },
    ],
  },
];

const reviews: Review[] = [
  {
    id: "r0",
    freelancerId: "f1",
    clientName: "Nadia Khelifi",
    rating: 5,
    text: "Logo magnifique pour ma boutique. Yacine est très professionnel et à l'écoute.",
    createdAt: "2026-06-01T11:00:00Z",
  },
  {
    id: "r1",
    freelancerId: "f1",
    clientName: "Mohamed R.",
    rating: 5,
    text: "Excellent travail, logo parfait pour ma boutique. Livraison rapide et professionnelle.",
    createdAt: "2026-05-12T10:00:00Z",
  },
  {
    id: "r2",
    freelancerId: "f1",
    clientName: "Fatima B.",
    rating: 5,
    text: "Yacine a su comprendre ma vision dès le premier brief. Je recommande vivement.",
    createdAt: "2026-04-28T14:30:00Z",
  },
  {
    id: "r3",
    freelancerId: "f2",
    clientName: "Rachid M.",
    rating: 5,
    text: "Site livré à temps, très réactif aux modifications. Parfait pour mon activité.",
    createdAt: "2026-05-01T09:15:00Z",
  },
];

export function getFreelancers(): Freelancer[] {
  return freelancers;
}

export function getFreelancerById(id: string): Freelancer | undefined {
  return freelancers.find((f) => f.id === id);
}

export function getFreelancerByUsername(username: string): Freelancer | undefined {
  return freelancers.find((f) => f.username === username);
}

export function getServiceById(id: string): (Service & { freelancer: Freelancer }) | undefined {
  for (const f of freelancers) {
    const service = f.services.find((s) => s.id === id);
    if (service) return { ...service, freelancer: f };
  }
  return undefined;
}

export function getAllServices(): (Service & { freelancer: Freelancer })[] {
  return freelancers.flatMap((f) =>
    f.services.filter((s) => s.isActive).map((s) => ({ ...s, freelancer: f }))
  );
}

export function getReviewsForFreelancer(freelancerId: string): Review[] {
  return reviews.filter((r) => r.freelancerId === freelancerId);
}

export function searchFreelancers(params: {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  verified?: boolean;
}): Freelancer[] {
  let results = [...freelancers];

  if (params.q) {
    const q = params.q.toLowerCase();
    results = results.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.specialty.toLowerCase().includes(q) ||
        f.bio.toLowerCase().includes(q) ||
        f.services.some((s) => s.title.toLowerCase().includes(q))
    );
  }

  if (params.category) {
    results = results.filter((f) => f.category === params.category);
  }

  if (params.minPrice !== undefined) {
    results = results.filter((f) => f.startingPriceDzd >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    results = results.filter((f) => f.startingPriceDzd <= params.maxPrice!);
  }

  if (params.minRating !== undefined) {
    results = results.filter((f) => f.averageRating >= params.minRating!);
  }

  if (params.verified === true) {
    results = results.filter((f) => f.isVerifiedFreelancer);
  }

  return results;
}
