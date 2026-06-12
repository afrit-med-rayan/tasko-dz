const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function getFeaturedFreelancers(): Promise<FreelancerSummary[]> {
  const res = await fetchApi<{ data: FreelancerSummary[] }>(
    "/api/v1/freelancers/search?limit=4&verified=true"
  );
  return res.data;
}

export async function searchFreelancers(params?: {
  q?: string;
  category?: string;
  verified?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ data: FreelancerSummary[]; meta: { total: number } }> {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.category) search.set("category", params.category);
  if (params?.verified) search.set("verified", "true");
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  return fetchApi(`/api/v1/freelancers/search?${search}`);
}

export async function getFreelancerPublic(idOrUsername: string): Promise<FreelancerProfile> {
  return fetchApi(`/api/v1/freelancers/${idOrUsername}/public`);
}

export async function getFreelancerReviews(id: string) {
  return fetchApi<{
    data: { id: string; clientName: string; rating: number; text: string; createdAt: string }[];
    averageRating: number;
  }>(`/api/v1/freelancers/${id}/reviews?limit=5`);
}

export async function getService(id: string) {
  return fetchApi<ServiceDetail & { freelancer: FreelancerSummary }>(`/api/v1/services/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetchApi<{ data: Category[] }>("/api/v1/categories");
  return res.data;
}

export function formatDzd(amount: number, locale: "fr" | "ar" = "fr"): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-DZ" : "fr-DZ").format(amount);
  return `${formatted} DZD`;
}
