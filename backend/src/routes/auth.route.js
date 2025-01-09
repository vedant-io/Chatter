import express from "express";
import {login, logout, signup} from "../controllers/auth.controller.js";
import {loginSchema, signupSchema, validateRequest} from "../libs/validator.js";

const router = express.Router();

router.post("/signup",validateRequest(signupSchema),signup)

router.post("/login",validateRequest(loginSchema),login)

router.get("/logout",logout)

export default router;
