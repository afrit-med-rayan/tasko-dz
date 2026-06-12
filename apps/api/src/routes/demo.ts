import { Router } from "express";

export const demoRouter = Router();

demoRouter.get("/users", (_req, res) => {
  res.json({
    data: [
      {
        id: "f1",
        username: "yacine-bensalem",
        name: "Yacine Bensalem",
        role: "FREELANCER",
        specialty: "Design graphique",
        city: "Alger",
        dashboardPath: "/freelancer/dashboard",
        profilePath: "/freelancer/yacine-bensalem",
      },
      {
        id: "c1",
        username: "nadia-khelifi",
        name: "Nadia Khelifi",
        role: "CLIENT",
        city: "Alger",
        dashboardPath: "/client/dashboard",
      },
    ],
  });
});
