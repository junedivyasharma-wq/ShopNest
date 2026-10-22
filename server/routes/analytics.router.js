import {Router} from "express";
import {verify} from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import {getadminStats} from "../controller/analytics.controller.js";
const router= Router();

router.get("/",verify,admin, getadminStats);

export default router;
