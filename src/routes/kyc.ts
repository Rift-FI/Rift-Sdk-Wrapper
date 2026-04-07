import { Router } from "express";
import { getToken, checkUserExists, getStatus, verifyAndSendOtp, verify, isVerified, getJobStatus } from "../controllers/kyc";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);

// Public endpoints (no auth required)
router.post("/token", getToken);
router.post("/user-exists", checkUserExists);
router.post("/status", getStatus);
router.post("/verify-and-send-otp", verifyAndSendOtp);

// Authenticated endpoints
router.post("/verify", authMiddleware, verify);
router.get("/verified", authMiddleware, isVerified);
router.get("/job/:jobId", authMiddleware, getJobStatus);

export default router;
