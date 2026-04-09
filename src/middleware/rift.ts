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
    const rift = new Rift({
      environment: Environment.PRODUCTION,
      apiKey: apiKey,
      timeout: 120_000, // 120s — onramp/offramp can take 30-90s due to mobile money STK push
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
