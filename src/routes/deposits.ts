import { Router } from "express";
import { getAllDeposits, getDepositStats } from "../controllers/deposits";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.get("/", getAllDeposits);
router.get("/stats", getDepositStats);

export default router;

