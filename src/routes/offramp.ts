import { Router } from "express";
import {
  previewExchangeRate,
  getSupportedInstitutions,
  sendPaymentLink,
  pay,
  createOrder,
  getWithdrawalFee,
  pollOrderStatus,
  getOrders,
} from "../controllers/offramp";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

// Apply middleware to all offramp routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/preview_exchange_rate", previewExchangeRate);
router.get("/payment_methods/:currency", getSupportedInstitutions);
router.post("/send-payment-link", sendPaymentLink);
router.post("/pay", pay);
// Two-phase preview; submit via /api/v1/signer/submit-prepared.
router.post("/preview", passthrough("POST", () => "/v1/offramps/preview"));
router.post("/", createOrder);
router.post("/get-withdrawal-fee", getWithdrawalFee);
router.get("/poll_order_status", pollOrderStatus);
router.get("/get_orders", getOrders);

export default router;
