import { Router } from "express";
import { getOrdersByUserId, getOrderById, createOrder, updateOrder, getServiceById } from "../data/mock";

export const ordersRouter = Router();

// Middleware to mock auth user (using a fixed client/freelancer for demo purposes)
const mockAuth = (req: any, res: any, next: any) => {
  // We'll use headers or default to "c1" (Nadia) for client actions and "f1" (Yacine) for freelancer actions
  const userId = req.headers["x-user-id"] || "c1"; 
  const role = req.headers["x-user-role"] || "CLIENT";
  req.user = { id: userId, role };
  next();
};

ordersRouter.use(mockAuth);

ordersRouter.get("/", (req: any, res) => {
  const orders = getOrdersByUserId(req.user.id, req.user.role);
  res.json(orders);
});

ordersRouter.get("/:id", (req: any, res) => {
  const order = getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Commande introuvable" });
  }
  res.json(order);
});

ordersRouter.post("/create", (req: any, res) => {
  if (req.user.role !== "CLIENT") {
    return res.status(403).json({ error: "FORBIDDEN", message: "Seuls les clients peuvent commander" });
  }

  const { serviceId, brief, deliveryDeadline } = req.body;
  if (!serviceId || !brief || !brief.text) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "serviceId et brief requis" });
  }

  const service = getServiceById(serviceId);
  if (!service) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Service introuvable" });
  }

  const order = createOrder({
    clientId: req.user.id,
    freelancerId: service.freelancerId,
    serviceId,
    brief,
    priceDzd: service.priceDzd,
    deliveryDeadline: deliveryDeadline || new Date(Date.now() + 7 * 86400000).toISOString(),
  });

  // Mock returning a BaridiMob payment URL
  res.status(201).json({
    orderId: order.id,
    status: order.status,
    paymentUrl: `http://localhost:3000/payment/mock?orderId=${order.id}`,
    expiresAt: new Date(Date.now() + 15 * 60000).toISOString()
  });
});

ordersRouter.post("/:id/payment-success", (req: any, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "NOT_FOUND" });

  updateOrder(order.id, {
    status: "ACTIVE",
    escrowStatus: "LOCKED"
  });

  res.json({ message: "Paiement confirmé", order });
});

ordersRouter.post("/:id/deliver", (req: any, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "NOT_FOUND" });

  if (req.user.role !== "FREELANCER" || order.freelancerId !== req.user.id) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  const { fileUrls, message } = req.body;
  
  updateOrder(order.id, {
    status: "DELIVERED",
    deliveredAt: new Date().toISOString(),
    deliveryFiles: fileUrls || [],
    deliveryMessage: message
  });

  res.json({ message: "Commande livrée", order });
});

ordersRouter.post("/:id/confirm", (req: any, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "NOT_FOUND" });

  if (req.user.role !== "CLIENT" || order.clientId !== req.user.id) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  updateOrder(order.id, {
    status: "COMPLETED",
    escrowStatus: "RELEASED"
  });

  res.json({ message: "Livraison confirmée. Paiement libéré.", order });
});

ordersRouter.post("/:id/dispute", (req: any, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "NOT_FOUND" });

  updateOrder(order.id, {
    status: "DISPUTE",
  });

  res.json({ message: "Litige ouvert. Notre équipe va examiner.", order });
});
