import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = new Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
