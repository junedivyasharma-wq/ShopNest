import {Router} from "express";
import { verify } from "../middleware/auth.middleware.js";
import {register, login, getUsers} from "../controller/user.controller.js";
import admin from "../middleware/admin.middleware.js";


const router=Router();

router.post("/register",register);
router.post("/login",login);
router.get("/getusers",verify,admin,getUsers);

export default router;


