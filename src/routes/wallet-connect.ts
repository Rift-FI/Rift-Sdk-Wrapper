import { Router } from "express";
import { pair, getRequests, rejectRequest, getSessions, disconnectSession } from "../controllers/wallet-connect";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/pair", pair);
router.get("/requests", getRequests);
// Approve takes an optional { ticketId, authProof } body (from /preview),
// which the pinned SDK can't send, so it goes straight to the backend.
// Without a proof the backend answers 202 APPROVAL_REQUIRED (relayed as-is).
router.post(
  "/requests/:id/preview",
  passthrough("POST", (req) => `/v1/wallet-connect/requests/${encodeURIComponent(req.params.id)}/preview`)
);
router.post(
  "/requests/:id/approve",
  passthrough("POST", (req) => `/v1/wallet-connect/requests/${encodeURIComponent(req.params.id)}/approve`)
);
router.post("/requests/:id/reject", rejectRequest);
router.get("/sessions", getSessions);
router.delete("/sessions/:topic", disconnectSession);

export default router;
