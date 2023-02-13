import { Router } from "express";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/auth.middleware";
import { validateParamsId } from "../utils/idValidation";
import * as requestController from "../controllers/requestBook.controller";

const router = Router();

router.get("/requests", requestController.getAllRequests);

router.get(
  "/UserRequest",
  userAuthMiddleware,
  requestController.getAllUserRequests
);

router.get("/requests/:id", validateParamsId, requestController.getUserRequest);

router.post(
  "/loan/:id",
  validateParamsId,
  adminAuthMiddleware,
  requestController.validateRequestState,
  requestController.aprobeRequest,
  requestController.loanBook
);

router.post(
  "/request/reject/:id",
  validateParamsId,
  adminAuthMiddleware,
  requestController.validateRequestState,
  requestController.rejectRequest
);

router.post(
  "/request/:id",
  validateParamsId,
  userAuthMiddleware,
  requestController.requestBook
);

router.post(
  "/return/:id",
  validateParamsId,
  adminAuthMiddleware,
  requestController.returnBook
);

router.get("/recentLoans", requestController.getRecentLoans);

router.get("/history", requestController.getRequestHistory);

export default router;
