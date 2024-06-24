import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
