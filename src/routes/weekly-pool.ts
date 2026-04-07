import { Router } from "express";
import { getCurrent, getHistory, getReferralInfo } from "../controllers/weekly-pool";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.get("/", getCurrent);
router.get("/history", getHistory);
router.get("/referral", getReferralInfo);

export default router;
