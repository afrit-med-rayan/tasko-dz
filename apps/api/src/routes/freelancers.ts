import { Router } from "express";
import {
  getFreelancerById,
  getFreelancerByUsername,
  getReviewsForFreelancer,
  searchFreelancers,
} from "../data/mock";

export const freelancersRouter = Router();

freelancersRouter.get("/search", (req, res) => {
  const q = req.query.q as string | undefined;
  const category = req.query.category as string | undefined;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const minRating = req.query.minRating ? Number(req.query.minRating) : undefined;
  const verified = req.query.verified === "true" ? true : undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

  const results = searchFreelancers({ q, category, minPrice, maxPrice, minRating, verified });
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  res.json({
    data: paginated.map(toPublicSummary),
    meta: { total: results.length, page, limit, totalPages: Math.ceil(results.length / limit) },
  });
});

freelancersRouter.get("/:id/public", (req, res) => {
  const freelancer =
    getFreelancerById(req.params.id) || getFreelancerByUsername(req.params.id);

  if (!freelancer) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Freelancer introuvable." });
  }

  res.json(toPublicProfile(freelancer));
});

freelancersRouter.get("/:id/reviews", (req, res) => {
  const freelancer = getFreelancerById(req.params.id);
  if (!freelancer) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Freelancer introuvable." });
  }

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));
  const ratingFilter = req.query.rating_filter ? Number(req.query.rating_filter) : undefined;

  let items = getReviewsForFreelancer(freelancer.id);
  if (ratingFilter !== undefined) {
    items = items.filter((r) => r.rating === ratingFilter);
  }

  const start = (page - 1) * limit;
  res.json({
    data: items.slice(start, start + limit),
    meta: { total: items.length, page, limit },
    averageRating: freelancer.averageRating,
  });
});

function toPublicSummary(f: ReturnType<typeof searchFreelancers>[0]) {
  return {
    id: f.id,
    username: f.username,
    name: f.name,
    specialty: f.specialty,
    city: f.city,
    isVerifiedFreelancer: f.isVerifiedFreelancer,
    averageRating: f.averageRating,
    totalReviews: f.totalReviews,
    startingPriceDzd: f.startingPriceDzd,
    completedOrdersCount: f.completedOrdersCount,
  };
}

function toPublicProfile(f: ReturnType<typeof getFreelancerById> & object) {
  return {
    id: f.id,
    username: f.username,
    name: f.name,
    specialty: f.specialty,
    category: f.category,
    city: f.city,
    bio: f.bio,
    languages: f.languages,
    profilePhotoUrl: f.profilePhotoUrl,
    isVerifiedIdentity: f.isVerifiedIdentity,
    isVerifiedFreelancer: f.isVerifiedFreelancer,
    averageRating: f.averageRating,
    totalReviews: f.totalReviews,
    completedOrdersCount: f.completedOrdersCount,
    responseRate: f.responseRate,
    startingPriceDzd: f.startingPriceDzd,
    portfolioUrls: f.portfolioUrls,
    services: f.services.filter((s) => s.isActive),
  };
}
