import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

export const authRouter = Router();

/** In-memory store for v0 dev only */
const pendingOtps = new Map<string, { otp: string; userId: string; expiresAt: number }>();
const users = new Map<string, object>();

const DEV_OTP = "1234";

authRouter.post("/register", (req, res) => {
  const { phone, name, role, email, specialty } = req.body;

  if (!phone || !name || !role) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "phone, name et role sont requis.",
    });
  }

  const userId = uuidv4();
  users.set(phone, { id: userId, phone, name, role, email, specialty });

  pendingOtps.set(phone, {
    otp: DEV_OTP,
    userId,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  console.log(`[v0 dev] OTP for ${phone}: ${DEV_OTP}`);

  res.json({
    message: `OTP envoyé au ${phone}`,
    userId,
  });
});

authRouter.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "phone requis." });
  }

  const existing = users.get(phone) as { id: string } | undefined;
  pendingOtps.set(phone, {
    otp: DEV_OTP,
    userId: existing?.id || uuidv4(),
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  console.log(`[v0 dev] OTP for ${phone}: ${DEV_OTP}`);

  res.json({ message: `OTP envoyé au ${phone}` });
});

authRouter.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "phone et otp requis." });
  }

  const pending = pendingOtps.get(phone);
  if (!pending || pending.expiresAt < Date.now()) {
    return res.status(400).json({
      error: "OTP_EXPIRED",
      message: "Code expiré. Demandez un nouveau code.",
    });
  }

  if (otp !== pending.otp) {
    return res.status(400).json({
      error: "OTP_INVALID",
      message: "Code incorrect, réessayez.",
      attemptsRemaining: 2,
    });
  }

  pendingOtps.delete(phone);
  const user = users.get(phone) as { id: string; name?: string; role?: string } | undefined
    ?? { id: pending.userId, phone, name: "Utilisateur", role: "CLIENT" };

  res.json({
    accessToken: `dev-token-${pending.userId}`,
    refreshToken: `dev-refresh-${pending.userId}`,
    user: {
      id: (user as { id: string }).id,
      phone,
      name: (user as { name?: string }).name ?? "Utilisateur",
      role: (user as { role?: string }).role ?? "CLIENT",
      is_verified_identity: false,
    },
  });
});

authRouter.post("/login", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "phone requis." });
  }

  pendingOtps.set(phone, {
    otp: DEV_OTP,
    userId: (users.get(phone) as { id: string } | undefined)?.id || uuidv4(),
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  console.log(`[v0 dev] OTP for ${phone}: ${DEV_OTP}`);

  res.json({ message: `OTP envoyé au ${phone}` });
});
