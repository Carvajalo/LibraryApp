import * as cleanController from "../controllers/clean.controller";
import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", userAuthMiddleware, cleanController.cleanAll);

export default router;
