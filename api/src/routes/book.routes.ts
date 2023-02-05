import { Router } from "express";
import * as bookController from "../controllers/book.controller";
import { notSupported } from "../controllers/notSupported.controller";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", bookController.getAllBooks);

router.post("/add", adminAuthMiddleware, bookController.addBook);

router.delete("/deleteAll", adminAuthMiddleware, bookController.deleteAllBooks);

router.delete(
  "/delete/:id",
  adminAuthMiddleware,
  bookController.deleteBook
);

router.put("/update/:id", adminAuthMiddleware, bookController.updateBook);

router.post("/add/:id", notSupported);

router.delete("/delete", notSupported);

router.put("/update", notSupported);

export default router;
