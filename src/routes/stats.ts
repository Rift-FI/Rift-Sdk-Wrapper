import { Router } from "express";
import { getVolume, getUsers, getTvl } from "../controllers/stats";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();

router.use(riftSdkMiddleware);

router.get("/volume", getVolume);
router.get("/users", getUsers);
router.get("/tvl", getTvl);

export default router;
