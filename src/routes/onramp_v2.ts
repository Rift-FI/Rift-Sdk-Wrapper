import { Router } from "express";
import {
  buy,
  getOnrampStatus,
  getOnrampOrders,
} from "../controllers/onramp_v2";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all onramp_v2 routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/", buy);
router.post("/status", getOnrampStatus);
router.get("/orders/:userId", getOnrampOrders);

export default router;
