import express, { Request, Response } from "express";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import * as userController from "../controllers/user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.post("/register", userController.register);

router.post("/newAdmin", adminAuthMiddleware, userController.createAdmin);

router.post("/login", userController.login);

router.post("/logout", userController.logOut);

export default router;
