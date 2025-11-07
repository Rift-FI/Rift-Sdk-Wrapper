import { Router } from "express";
import {
  requestPayment,
  payPaymentRequest,
  createSpecificSendLink,
  createOpenSendLink,
  claimSpecificSendLink,
  claimOpenSendLink,
  listPaymentRequests,
  listSendLinks,
  cancelPaymentRequest,
  cancelSendLink,
  registerRequestLinkRedirectUrl,
  registerSendLinkRedirectUrl,
  getAllUsers,
  getRedirectLinks,
} from "../controllers/payment-links";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all payment-links routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

// Payment Request endpoints
router.post("/request-payment", requestPayment);
router.post("/execute", payPaymentRequest);
router.get("/list-payment-requests", listPaymentRequests);
router.delete("/cancel-payment-request/:nonce", cancelPaymentRequest);

// Send Link endpoints
router.post("/send-specific", createSpecificSendLink);
router.post("/send-open", createOpenSendLink);
router.post("/claim-specific", claimSpecificSendLink);
router.post("/claim-open", claimOpenSendLink);
router.get("/list-send-links", listSendLinks);
router.delete("/cancel-send-link/:urlId", cancelSendLink);

// Project/Redirect URL endpoints
router.post("/project/register-request-link-redirect-url", registerRequestLinkRedirectUrl);
router.post("/project/register-send-link-redirect-url", registerSendLinkRedirectUrl);
router.post("/project/get-redirect-links", getRedirectLinks);

// User endpoints
router.get("/user/all", getAllUsers);

export default router;

