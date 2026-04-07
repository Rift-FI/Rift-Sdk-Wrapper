import { Router } from "express";
import { pair, getRequests, approveRequest, rejectRequest, getSessions, disconnectSession } from "../controllers/wallet-connect";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/pair", pair);
router.get("/requests", getRequests);
router.post("/requests/:id/approve", approveRequest);
router.post("/requests/:id/reject", rejectRequest);
router.get("/sessions", getSessions);
router.delete("/sessions/:topic", disconnectSession);

export default router;
