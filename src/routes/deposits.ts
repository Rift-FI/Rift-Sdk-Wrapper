import { Router } from "express";
import { getAllDeposits } from "../controllers/deposits";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all deposits routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.get("/", getAllDeposits);

export default router;

