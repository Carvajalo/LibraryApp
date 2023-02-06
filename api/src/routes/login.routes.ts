import express from "express";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import * as loginController from "../controllers/login.controller";

const router = express.Router();

router.post("/register", loginController.register);

router.post("/newAdmin", adminAuthMiddleware, loginController.createAdmin);

router.post("/login", loginController.login);

router.post("/logout", loginController.logOut);

export default router;
