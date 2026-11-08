import { Router } from "express";
import { send, getHistory, getFee } from "../controllers/transaction";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

// Apply middleware to all transaction routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

// One-phase: with { ticketId, authProof } it submits; without, 202
// APPROVAL_REQUIRED is relayed unchanged.
router.post("/send", send);
// Two-phase preview → { ticketId, hashToSign, ... }. Submit via
// /api/v1/signer/submit-prepared.
router.post("/preview", passthrough("POST", () => "/v1/transactions/preview"));
router.get("/history", getHistory);
router.get("/fee", getFee);

export default router;
