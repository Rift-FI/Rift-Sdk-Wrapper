import { Request, Response, NextFunction } from "express";
import RiftV1, { Environment as EnvironmentV1 } from "@rift-finance/wallet-v1";
import RiftV3, { Environment as EnvironmentV3 } from "@rift-finance/wallet";

// Two SDK instances per request:
//
//   req.rift   — v1 SDK (npm: @rift-finance/wallet@1.4.34, aliased to
//                @rift-finance/wallet-v1). Backs every existing
//                /api/v1/* endpoint. Wire shape is the legacy one;
//                no enrolledMethods, no authProof, no v3 helpers.
//
//   req.riftV3 — v3 SDK (npm: @rift-finance/wallet@^3.0.0). Backs the
//                new /api/v2/* endpoints (migrate-to-v3 etc.) and any
//                future v2 routes. Adds enrolledMethods, authProof,
//                migrateToV3, plus the browser-side ceremony helpers
//                (PasskeyHelper / OidcHelper) which are tree-shaken on
//                the server side.
//
// Both instances are created per-request with the same project API
// key so the two SDK trees can never bleed credentials across each
// other. Cheap — Rift's constructor is just a property assignment
// plus an HTTP client. No connection pool warmup.
declare global {
  namespace Express {
    export interface Request {
      rift?: RiftV1;
      riftV3?: RiftV3;
    }
  }
}

export const riftSdkMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    return res
      .status(401)
      .json({ error: "Unauthorized: X-API-Key header is missing." });
  }

  try {
    // retries: 0 — this is critical, not just an optimization.
    //
    // The wrapper exposes non-idempotent endpoints (signup, login, send,
    // pay, swap, invoice creation, etc.). If an upstream request actually
    // succeeded but the response was lost (transient network error, gateway
    // hiccup, client abort mid-flight), an automatic retry submits a
    // duplicate. The backend will reject the duplicate — signup → 409 user
    // exists, send/pay → duplicate transaction or balance error — even
    // though the original operation worked. The user sees a failure for an
    // op that actually succeeded.
    //
    // Internal retries are unsafe without idempotency keys, which the SDK
    // doesn't implement. Retry policy belongs at the caller, where the
    // caller knows whether the op is replayable.
    //
    // Timeout stays at 120s for ramp tolerance (mobile-money STK push runs
    // 60–90s upstream). Server timeout in index.ts is 130s, 10s buffer.
    req.rift = new RiftV1({
      environment: EnvironmentV1.PRODUCTION,
      apiKey: apiKey,
      timeout: 120_000,
      retries: 0,
    });
    req.riftV3 = new RiftV3({
      environment: EnvironmentV3.PRODUCTION,
      apiKey: apiKey,
      timeout: 120_000,
      retries: 0,
    });

    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to initialize Rift SDK.",
      details: error.message,
    });
  }
};
