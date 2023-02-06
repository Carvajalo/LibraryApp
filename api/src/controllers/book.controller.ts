import { Request, Response, NextFunction } from "express";
import Book, { IBook, ILoanHistory } from "../models/book";
import User, { IUser } from "../models/user";

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
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.json({
      message: "invalid ID",
    });
  }

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

export const loanBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const book: IBook | null = await Book.findById(id);
    const user: IUser | null = await User.findById(userId);
    if (!book) return res.status(200).send({ error: "Book not found" });
    if (!user) return res.status(200).send({ error: "User not found" });
    if (book.loanHistory.length > 0) {
      const lastLoan = book.loanHistory[book.loanHistory.length - 1];
      if (lastLoan.returnDate === null) {
        return res.status(200).send({ error: "Book already loaned" });
      }
    }
    const newLoan: ILoanHistory[] = book.loanHistory;
    const date = new Date();
    newLoan.push({
      loanDate: date,
      userId,
      returnDate: null,
    });
    book.loanHistory = newLoan;
    await book.save();
    const newBorrowedBook = user.borrowedBooks;
    newBorrowedBook.push({
      bookId: id,
      loanDate: date,
      returnDate: null,
    });
    user.borrowedBooks = newBorrowedBook;
    await user.save();
    return res.status(200).send({ message: "Book loaned", book });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const returnBook = await Book.findById(id);
    if (!returnBook) return res.status(200).send({ error: "Book not found" });
    if (returnBook.loanHistory.length === 0) {
      return res.status(200).send({ error: "Book not loaned" });
    }
    const lastLoan = returnBook.loanHistory[returnBook.loanHistory.length - 1];
    const userId = lastLoan.userId;
    if (lastLoan.returnDate !== null) {
      return res.status(200).send({ error: "Book already returned" });
    }
    const returnDate = new Date();
    lastLoan.returnDate = returnDate;
    //! Esto es lo nuevo
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    //! Update user borrowed books
    const borrowedBooks = user.borrowedBooks;
    console.log(borrowedBooks);
    const bookIndex = borrowedBooks.findIndex((book) => {
      console.log(`book.bookId ${book.bookId}, id: ${id}`);

      return book.bookId.toString() === id;
    });
    console.log(bookIndex);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found as" });
    }
    borrowedBooks[bookIndex].returnDate = returnDate;
    user.borrowedBooks = borrowedBooks;
    //
    console.log(user);
    await user.save();
    //!
    await returnBook.save();
    return res.status(200).send({ message: "Book returned", returnBook });
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
