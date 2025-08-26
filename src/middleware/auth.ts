import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Authorization header is missing." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Bearer token is missing." });
  }

  if (!req.rift) {
    // This should not happen if riftSdkMiddleware is used before this
    return res.status(500).json({ error: "Rift SDK not initialized." });
  }

  try {
    req.rift.setBearerToken(token);
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to authenticate with bearer token.",
      details: error.message,
    });
  }
};
