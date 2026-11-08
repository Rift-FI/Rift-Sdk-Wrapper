import { Router } from "express";
import {
  getWalletInstance,
  signTransaction,
  sendTransaction,
  signMessage,
} from "../controllers/signer";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

// Apply middleware to all signer routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/get-wallet-instance", getWalletInstance);
router.post("/sign-transaction", signTransaction);
router.post("/send-transaction", sendTransaction);
router.post("/sign-message", signMessage);

// Two-phase (passkey) signing. preview → passkey signs hashToSign on the
// user's device → submit { ticketId, authProof }. Never retried.
router.post("/preview-user-op", passthrough("POST", () => "/v1/wallet/user-operations/preview"));
router.post("/submit-prepared", passthrough("POST", () => "/v1/wallet/user-operations/submit-prepared"));
router.post("/preview-message", passthrough("POST", () => "/v1/wallet/signatures/message/preview"));
router.post("/submit-message", passthrough("POST", () => "/v1/wallet/signatures/message"));

export default router;
