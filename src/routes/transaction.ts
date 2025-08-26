import { Router } from "express";
import { send, getHistory, getFee } from "../controllers/transaction";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all transaction routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/send", send);
router.get("/history", getHistory);
router.get("/fee", getFee);

export default router;
