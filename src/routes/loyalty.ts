import { Router } from "express";
import { getStats, getHistory, getLeaderboard, getMetrics, getPointValue, redeem, getRedemptions, getConfig } from "../controllers/loyalty";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);

// Public endpoints
router.get("/leaderboard", getLeaderboard);
router.get("/point-value", getPointValue);

// Authenticated endpoints
router.get("/stats", authMiddleware, getStats);
router.get("/history", authMiddleware, getHistory);
router.get("/metrics", authMiddleware, getMetrics);
router.post("/redeem", authMiddleware, redeem);
router.get("/redemptions", authMiddleware, getRedemptions);
router.get("/config", authMiddleware, getConfig);

export default router;
