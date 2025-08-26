import { Router } from "express";
import { getTokenBalance, getChainBalance } from "../controllers/wallet";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all wallet routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.get("/token-balance", getTokenBalance);
router.get("/chain-balance", getChainBalance);

export default router;
