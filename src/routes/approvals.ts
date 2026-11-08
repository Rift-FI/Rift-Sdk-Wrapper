import { Router } from "express";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

// Approval requests (backend /v1/approvals). Fund-moving calls made without
// a passkey proof answer 202 { status: "APPROVAL_REQUIRED", approvalId,
// approvalUrl, ... }; the user approves at approvalUrl with a passkey.
// These routes let a client track (and, with a passkey, approve) them.
const router = Router();

router.use(riftSdkMiddleware);

const id = (req: any) => encodeURIComponent(req.params.id);

// List the user's approvals (?status=pending). User JWT.
router.get("/", authMiddleware, passthrough("GET", () => "/v1/approvals"));
// Status + result. The creating project's API key alone is enough, so the
// Bearer token is optional here (forwarded when present).
router.get("/:id", passthrough("GET", (req) => `/v1/approvals/${id(req)}`));
// Fresh { ticketId, hashToSign, ... } built from the stored intent. User JWT.
router.post("/:id/preview", authMiddleware, passthrough("POST", (req) => `/v1/approvals/${id(req)}/preview`));
// { ticketId, authProof } (passkey). User JWT. Never retried.
router.post("/:id/approve", authMiddleware, passthrough("POST", (req) => `/v1/approvals/${id(req)}/approve`));
router.post("/:id/reject", authMiddleware, passthrough("POST", (req) => `/v1/approvals/${id(req)}/reject`));

export default router;
