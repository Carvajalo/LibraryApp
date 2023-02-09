import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Book from "../models/book";
import RequestBook from "../models/requestBook";

export const cleanAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await User.updateMany({}, { $set: { borrowedBooks: [] } });
  await Book.updateMany({}, { $set: { loanHistory: [] } });
  await RequestBook.deleteMany({});
  res.status(200).send({ message: "Successfully cleaned" });
};
