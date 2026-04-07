import { Router } from "express";
import { create, getAll, getMyProjects, getById, getStats, regenerateKey, deleteProject, addOrigin, updatePaymentWidget } from "../controllers/project";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();

router.use(riftSdkMiddleware);

// Static routes first
router.post("/create", create);
router.get("/all", getAll);
router.post("/my-projects", getMyProjects);
router.post("/update-payment-link-widget", updatePaymentWidget);

// Parameterized routes with sub-paths before generic :id
router.get("/:id/stats", getStats);
router.post("/:id/regenerate-key", regenerateKey);
router.post("/:projectId/origins", addOrigin);

// Generic parameterized routes last
router.get("/:id", getById);
router.delete("/:id", deleteProject);

export default router;
