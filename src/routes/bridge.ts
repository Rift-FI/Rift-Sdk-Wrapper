import { Router } from "express";
import { getRoutes, getQuote, execute } from "../controllers/bridge";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

router.use(riftSdkMiddleware);

// Public endpoints
router.get("/routes", getRoutes);
router.post("/quote", getQuote);

// Authenticated endpoint
router.post("/execute", authMiddleware, execute);
// Two-phase preview; submit via /api/v1/signer/submit-prepared.
router.post("/preview", authMiddleware, passthrough("POST", () => "/v1/bridge/transfers/preview"));

export default router;
