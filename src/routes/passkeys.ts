import { Router } from "express";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";
import { passthrough } from "../utils/passthrough";

// Passkeys that own the user's Safe wallet (backend /v1/wallet/passkeys).
// The WebAuthn ceremonies run on the user's device; the wrapper only relays.
// Every call needs the user's Bearer token. Writes are never retried
// (single-use challenges and tickets).
const router = Router();

router.use(riftSdkMiddleware);
router.use(authMiddleware);

const id = (req: any) => encodeURIComponent(req.params.id);

// WebAuthn creation options (ES256 / alg -7 only).
router.post("/options", passthrough("POST", () => "/v1/wallet/passkeys/options"));
// Register: { attestation: { cred_id_b64, client_data_json_b64, attestation_object_b64 }, label? }
router.post("/", passthrough("POST", () => "/v1/wallet/passkeys"));
// Finish adding a passkey: { credentialId, signatures: [{ ticketId, authProof }] }
router.post("/confirm", passthrough("POST", () => "/v1/wallet/passkeys/confirm"));
router.get("/", passthrough("GET", () => "/v1/wallet/passkeys"));
// Start removal → { tickets }; then confirm-removal { signatures }. 409 LAST_PASSKEY.
router.delete("/:id", passthrough("DELETE", (req) => `/v1/wallet/passkeys/${id(req)}`));
router.post(
  "/:id/confirm-removal",
  passthrough("POST", (req) => `/v1/wallet/passkeys/${id(req)}/confirm-removal`)
);

export default router;
