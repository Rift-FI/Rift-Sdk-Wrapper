import { Request, Response, NextFunction } from "express";
import Rift, { Environment } from "@rift-finance/wallet";

// Extend the Express Request interface to include a 'rift' property
declare global {
  namespace Express {
    export interface Request {
      rift?: Rift;
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
    const rift = new Rift({
      environment: Environment.PRODUCTION,
      apiKey: apiKey,
      timeout: 120_000,
      retries: 0,
    });

    // Attach the SDK instance to the request object
    req.rift = rift;

    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to initialize Rift SDK.",
      details: error.message,
    });
  }
};
