import { Router } from "express";
import { suspendUser, unsuspendUser, getSuspendedUsers, getUserStatus } from "../controllers/user-management";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();

router.use(riftSdkMiddleware);

// All routes below need the PROJECT OWNER's token: Authorization: Bearer <token>
// (plus X-API-Key). projectOwnerEmail / projectOwnerPhone are ignored.

router.post("/suspend", suspendUser);
router.post("/unsuspend", unsuspendUser);
router.get("/suspended", getSuspendedUsers);
router.get("/status", getUserStatus);
router.get("/lookup", getUserStatus);

export default router;
