import { Router } from "express";
import { getRoutes, getQuote, execute } from "../controllers/bridge";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);

// Public endpoints
router.get("/routes", getRoutes);
router.post("/quote", getQuote);

// Authenticated endpoint
router.post("/execute", authMiddleware, execute);

export default router;
