import { Router } from "express";
import { suspendUser, unsuspendUser, getSuspendedUsers, getUserStatus } from "../controllers/user-management";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();

router.use(riftSdkMiddleware);

router.post("/suspend", suspendUser);
router.post("/unsuspend", unsuspendUser);
router.get("/suspended", getSuspendedUsers);
router.get("/status", getUserStatus);

export default router;
