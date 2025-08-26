import { Router } from "express";
import {
  createInvoice,
  getInvoices,
  getMerchantStatus,
} from "../controllers/merchant";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all merchant routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);
router.get("/status", getMerchantStatus);

export default router;
