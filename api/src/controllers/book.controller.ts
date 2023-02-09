import { Request, Response, NextFunction } from "express";
import Book, { IBook, ILoanHistory } from "../models/book";
import User, { IUser } from "../models/user";
import RequestBook, { IRequestBook } from "../models/requestBook";

export type userDataType = {
  id: string;
  role: string;
};

export const getAllBooks = async (_: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ error: `Book with id ${id} not found` });
    }
    res.status(200).send(book);
  } catch (error) {}
};

export const addBook = async (req: Request, res: Response, _: NextFunction) => {
  const { title, author, ISBN } = req.body;

  const bookfind = await Book.find({ ISBN });
  if (bookfind.length > 0) {
    return res.status(400).send({ error: "Book already exists", bookfind });
  }

  const book = new Book({
    title,
    author,
    ISBN,
  });
  try {
    const savedBook = await book.save();
    return res.json(savedBook);
  } catch (error) {
    res.json({ error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted", deletedBook });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.loanHistory) {
      return res.status(400).send({ error: "Cannot update loan history" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.status(200).send({ message: "Book updated", updatedBook });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAllBooks = async (req: Request, res: Response) => {
  try {
    await Book.deleteMany({});
    await RequestBook.deleteMany({});
    await User.updateMany({}, { borrowedBooks: [] });
    res.status(200).send({ message: "All books deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
