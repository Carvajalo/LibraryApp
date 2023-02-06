import express, { Request, Response } from "express";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import * as userController from "../controllers/user.controller";
import { validateParamsId } from "../utils/idValidation";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", validateParamsId, userController.getUserById);

router.delete(
  "/:id",
  validateParamsId,
  adminAuthMiddleware,
  userController.deleteUserById
);

router.delete("/deleteAll", adminAuthMiddleware, userController.deteteAllUsers);

router.put(
  "/:id",
  validateParamsId,
  adminAuthMiddleware,
  userController.updateUserById
);

export default router;
