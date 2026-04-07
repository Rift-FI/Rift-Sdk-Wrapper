import { Router } from "express";
import { getBalance, getEntries, claim, getClaims, getReferrals } from "../controllers/referral-fees";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);

// Authenticated endpoints
router.get("/balance", authMiddleware, getBalance);
router.get("/entries", authMiddleware, getEntries);
router.post("/claim", authMiddleware, claim);
router.get("/claims", authMiddleware, getClaims);

// API key only endpoint
router.get("/referrals", getReferrals);

export default router;
