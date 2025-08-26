import { Router } from "express";
import {
  registerSubscription,
  unsubscribe,
  getUserSubscriptions,
  sendTestNotification,
  sendToAllUserSubscribers,
  deleteAllSubscriptions,
} from "../controllers/notification";
import { riftSdkMiddleware } from "../middleware/rift";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Apply middleware to all notification routes
router.use(riftSdkMiddleware);
router.use(authMiddleware);

router.post("/register", registerSubscription);
router.post("/unsubscribe", unsubscribe);
router.get("/subscriptions", getUserSubscriptions);
router.post("/test", sendTestNotification);
router.post("/send", sendToAllUserSubscribers);
router.delete("/subscriptions", deleteAllSubscriptions);

export default router;
