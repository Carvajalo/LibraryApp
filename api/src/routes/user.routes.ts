import express, { Request, Response } from "express";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import * as userController from "../controllers/user.controller";
import { validateParamsId } from "../utils/idValidation";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/users", userController.getAllStudents);

router.get("/admins", userController.getAllAdmins);

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


/* router.post("/requestBook", userController.requestBook); */
export default router;
