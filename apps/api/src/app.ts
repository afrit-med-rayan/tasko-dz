import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { freelancersRouter } from "./routes/freelancers";
import { servicesRouter } from "./routes/services";
import { categoriesRouter } from "./routes/categories";
import { authRouter } from "./routes/auth";
import { demoRouter } from "./routes/demo";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.WEB_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/freelancers", freelancersRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/demo", demoRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "NOT_FOUND", message: "Endpoint introuvable." });
});

app.listen(PORT, () => {
  console.log(`Tasko API v0 running on http://localhost:${PORT}`);
});
