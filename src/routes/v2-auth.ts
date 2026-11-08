/**
 * Auth additions exposed only under /api/v2/auth/*. The base /v1 router
 * stays unchanged; this file adds the non-custodial-only endpoints that
 * weren't part of the v1 contract.
 *
 * Mounting in index.ts:
 *   app.use("/api/v2/auth", v2AuthRouter);
 *
 * Existing flows (signup, login, OTP, recovery, etc.) keep their /api/v1
 * paths. Clients on SDK v2 can choose to call /api/v2/auth/migrate-to-v3
 * to upgrade an existing wallet without changing the address.
 */

import { Router } from "express";
import { migrateToV3 } from "../controllers/auth";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();
router.use(riftSdkMiddleware);

// Removed: answers 410 REPLACED_BY_PASSKEY_WALLETS (see controller). Use
// /api/v1/passkeys instead.
router.post("/migrate-to-v3", migrateToV3);

export default router;
