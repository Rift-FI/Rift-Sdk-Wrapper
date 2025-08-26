import { Router } from "express";
import {
  getWalletInstance,
  signTransaction,
  sendTransaction,
  signMessage,
} from "../controllers/signer";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all signer routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/get-wallet-instance", getWalletInstance);
router.post("/sign-transaction", signTransaction);
router.post("/send-transaction", sendTransaction);
router.post("/sign-message", signMessage);

export default router;
