import { Router } from "express";
import { swap } from "../controllers/defi";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/swap", swap);

export default router;
