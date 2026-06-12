import { Router } from "express";
import { getAllServices, getServiceById } from "../data/mock";

export const servicesRouter = Router();

servicesRouter.get("/", (req, res) => {
  const category = req.query.category as string | undefined;
  const freelancerId = req.query.freelancerId as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

  let items = getAllServices();
  if (category) items = items.filter((s) => s.category === category);
  if (freelancerId) items = items.filter((s) => s.freelancerId === freelancerId);

  const start = (page - 1) * limit;
  res.json({
    data: items.slice(start, start + limit).map(toPublicService),
    meta: { total: items.length, page, limit },
  });
});

servicesRouter.get("/:id", (req, res) => {
  const service = getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Service introuvable." });
  }
  res.json(toPublicService(service));
});

function toPublicService(s: ReturnType<typeof getServiceById> & object) {
  return {
    id: s.id,
    freelancerId: s.freelancerId,
    title: s.title,
    description: s.description,
    category: s.category,
    subcategory: s.subcategory,
    priceDzd: s.priceDzd,
    deliveryDays: s.deliveryDays,
    revisionCount: s.revisionCount,
    tags: s.tags,
    freelancer: {
      id: s.freelancer.id,
      username: s.freelancer.username,
      name: s.freelancer.name,
      city: s.freelancer.city,
      isVerifiedFreelancer: s.freelancer.isVerifiedFreelancer,
      averageRating: s.freelancer.averageRating,
    },
  };
}
