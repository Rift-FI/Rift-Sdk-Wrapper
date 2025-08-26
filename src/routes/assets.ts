import { Router, Request, Response, NextFunction } from "express";
import {
  getSupportedChains,
  getAllTokens,
  getUserTokens,
  getTokensByChainId,
  getTokenById,
  getChainById,
} from "../controllers/assets";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply SDK middleware to all asset routes
router.use(riftSdkMiddleware);

// Public routes
router.get("/tokens", getAllTokens);
router.get("/tokens/chain/:chainId", getTokensByChainId);
router.get("/tokens/:tokenId", getTokenById);
router.get("/chains/:chainId", getChainById);

// Authenticated routes
router.get("/tokens/user", authMiddleware, getUserTokens);

// Route with conditional authentication
router.get(
  "/supported-chains",
  (req: Request, res: Response, next: NextFunction) => {
    // If the 'active' query param is true, authentication is required
    if (req.query.active === "true") {
      return authMiddleware(req, res, next);
    }
    // Otherwise, it's a public call, so we skip the auth middleware
    return next();
  },
  getSupportedChains
);

export default router;
