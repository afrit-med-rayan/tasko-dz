import { Router } from "express";
import { CATEGORIES } from "../data/mock";

export const categoriesRouter = Router();

categoriesRouter.get("/", (_req, res) => {
  res.json({ data: CATEGORIES });
});
