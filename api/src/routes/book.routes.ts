import { Router } from "express";
import * as bookController from "../controllers/book.controller";
import { notSupported } from "../controllers/notSupported.controller";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import { validateParamsId, validateBodyId } from "../utils/idValidation";

const router = Router();

router.get("/", bookController.getAllBooks);

router.get("/:id", validateParamsId, bookController.getBook);

router.post("/add", adminAuthMiddleware, bookController.addBook);

router.delete("/deleteAll", adminAuthMiddleware, bookController.deleteAllBooks);

router.delete(
  "/delete/:id",
  validateParamsId,
  adminAuthMiddleware,
  bookController.deleteBook
);

router.put("/update/:id", adminAuthMiddleware, bookController.updateBook);

// Loan books routes:

router.get("/recentLoans", bookController.getRecentLoans);

router.post(
  "/loan/:id",
  validateParamsId,
  validateBodyId,
  adminAuthMiddleware,
  bookController.loanBook
);

router.post(
  "/return/:id",
  validateParamsId,
  adminAuthMiddleware,
  bookController.returnBook
);

// Not supported routes:

router.post("/add/:id", notSupported);

router.delete("/delete", notSupported);

router.put("/update", notSupported);

router.post("/loan", notSupported);

export default router;
