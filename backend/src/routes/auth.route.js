import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  loginSchema,
  signupSchema,
  validateRequest,
} from "../libs/validator.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);

router.post("/login", validateRequest(loginSchema), login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
