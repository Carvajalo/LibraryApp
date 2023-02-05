import { Request, Response, NextFunction } from "express";
import Book, { IBook } from "../models/book";
import User, { IUser } from "../models/user";

export type userDataType = {
  id: string;
  role: string;
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const addBook = async (req: Request, res: Response, _: NextFunction) => {
  /*  const user: userDataType = req.user; */
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
    res.status(200).send(deletedBook);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
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

export const getRecentLoans = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ "loanHistory.loanDate": -1 });
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAllBooks = async (req: Request, res: Response) => {
  try {
    Book.collection.drop();
    res.status(200).send({ message: "All books deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
