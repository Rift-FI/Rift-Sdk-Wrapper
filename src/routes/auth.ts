import { Router } from "express";
import {
  signup,
  login,
  updateUser,
  sendOtp,
  verifyOtp,
  getUser,
  deleteUser,
  logout,
  createRecoveryMethods,
  getRecoveryOptions,
  requestPasswordReset,
  resetPassword,
  updateRecoveryMethods,
  addRecoveryMethod,
  removeRecoveryMethod,
  updateRecoveryMethod,
  getMyRecoveryMethods,
  deleteAllRecoveryMethods,
} from "../controllers/auth";
import { riftSdkMiddleware } from "../middleware/rift";

const router = Router();

// Apply the middleware to all routes in this file
router.use(riftSdkMiddleware);

router.post("/signup", signup);
router.post("/login", login);
router.put("/user/update", updateUser);
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);
router.get("/user/me", getUser);
router.delete("/user/delete", deleteUser);
router.post("/logout", logout);

// Recovery Endpoints
router.post("/recovery/create", createRecoveryMethods);
router.get("/recovery/options/:externalId", getRecoveryOptions);
router.post("/recovery/request-reset", requestPasswordReset);
router.post("/recovery/reset-password", resetPassword);
router.put("/recovery/update", updateRecoveryMethods);
router.post("/recovery/add-method", addRecoveryMethod);
router.delete("/recovery/remove-method", removeRecoveryMethod);
router.put("/recovery/update-method", updateRecoveryMethod);
router.post("/recovery/my-methods", getMyRecoveryMethods);
router.delete("/recovery/delete-all", deleteAllRecoveryMethods);

export default router;
