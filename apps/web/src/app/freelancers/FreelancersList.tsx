"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { FreelancerCard } from "@/components/freelancer/FreelancerCard";
import type { FreelancerSummary } from "@/lib/api";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const CATEGORIES = [
  { id: "", labelFr: "Tout" },
  { id: "design_graphique", labelFr: "Design graphique" },
  { id: "dev_web", labelFr: "Développement web" },
  { id: "video_animation", labelFr: "Vidéo & Animation" },
  { id: "redaction", labelFr: "Rédaction" },
  { id: "traduction", labelFr: "Traduction" },
  { id: "social_media", labelFr: "Social media" },
];

interface Props {
  freelancers: FreelancerSummary[];
  total: number;
  initialQuery?: string;
  initialCategory?: string;
}

export function FreelancersList({ freelancers, total, initialQuery, initialCategory }: Props) {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery ?? "");
  const activeCategory = initialCategory ?? "";

  const navigate = (q: string, cat: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    router.push(`/freelancers?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query, activeCategory);
  };

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.labelFr ?? activeCategory.replaceAll("_", " ");

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero bar */}
      <div className="border-b border-light-border/60 bg-white">
        <div className="container-page py-10 md:py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            {t.freelancers.title}
          </h1>
          <p className="mt-2 text-mid-gray">
            <span className="font-semibold text-teal">{total}</span> {t.freelancers.results}
            {activeCategory ? ` · ${activeCategoryLabel}` : ""}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative mt-6 max-w-2xl">
            <Search
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-mid-gray"
            />
            <input
              type="search"
              placeholder={t.freelancers.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field ps-11 pr-28 shadow-sm"
            />
            <button
              type="submit"
              className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-teal px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Chercher
            </button>
          </form>

          {/* Category pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => navigate(query, cat.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-teal text-white shadow-sm"
                      : "bg-white text-dark-gray ring-1 ring-light-border hover:ring-teal/40 hover:text-teal"
                  }`}
                >
                  {cat.labelFr}
                  {isActive && cat.id && (
                    <X
                      size={13}
                      className="text-white/80"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        navigate(query, "");
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-page py-10">
        {freelancers.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-mid-gray">
                {freelancers.length} freelancer{freelancers.length > 1 ? "s" : ""} trouvé
                {freelancers.length > 1 ? "s" : ""}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-light-border bg-white px-3 py-2 text-sm font-medium text-dark-gray hover:border-teal/40 hover:text-teal"
              >
                <SlidersHorizontal size={15} />
                Filtres
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {freelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-card border border-dashed border-light-border bg-white py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-off-white text-mid-gray">
              <Search size={28} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-lg font-medium text-charcoal">{t.freelancers.noResults}</p>
            <p className="mt-2 max-w-xs text-sm text-mid-gray">{t.freelancers.noResultsHint}</p>
            <button
              type="button"
              onClick={() => navigate("", "")}
              className="mt-6 rounded-btn bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
