import { Router } from "express";
import { getTokenBalance, getChainBalance } from "../controllers/wallet";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

// Apply middleware to all wallet routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.get("/token-balance", getTokenBalance);
router.get("/chain-balance", getChainBalance);
// Passkey wallet state: { mode, walletAddress, passkeyCount, chains, needsPasskeySetup }.
router.get("/status", passthrough("GET", () => "/v1/wallet/status"));

export default router;
