import { NextFunction, Request, Response } from "express";
import { userDataType } from "../middlewares/auth.middleware";
import Book, { IBook } from "../models/book";
import User, { IUser } from "../models/user";
import RequestBook, { IRequestBook } from "../models/requestBook";
import { ObjectId } from "mongodb";
import { agregation } from "../utils/idValidation";

export const requestBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = req.body.user as userDataType;
    const Validateuser = await User.findById(user.id);
    if (!Validateuser) {
      return res.status(400).send({ message: "User not found" });
    }

    const book = (await Book.findById(id)) as IBook;
    //! Validate if book is already loaned
    if (!book) return res.status(400).send({ message: "Book not found" });
    if (book.loanHistory.length > 0) {
      const lastLoan = book.loanHistory[book.loanHistory.length - 1];
      if (lastLoan.returnDate === null) {
        return res
          .status(400)
          .send({ message: "This book is already loaned", lastLoan });
      }
    }
    const isRequested = await RequestBook.findOne({
      bookId: id,
      userId: user.id,
      status: "pending",
    });
    if (isRequested) {
      return res
        .status(400)
        .send({ message: "You already requested this book", isRequested });
    }

    const request = new RequestBook({
      bookId: id,
      userId: user.id,
    });
    await request.save();
    res.status(200).send({ message: "Request created", request });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUserRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const requestID = new ObjectId(id);
  try {
    const userRequest = await RequestBook.aggregate([
      {
        $match: {
          _id: requestID,
        },
      },
      ...agregation,
    ]);
    if (!userRequest)
      return res.status(400).send({ message: "Request not found a" });
    res.status(200).send(userRequest);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllRequests = async (_: Request, res: Response) => {
  try {
    const requests = await RequestBook.aggregate(agregation);

    /*
    const requests = await RequestBook.find({}, { $in: ["bookId", "userId"] });
    if (!requests)
      return res.status(400).send({ message: "Requests not found" });
    const user = await User.find({
      _id: { $in: requests.map((r) => r.userId) },
    });
    */
    res.status(200).send(requests);
  } catch (error) {
    res.status(400).send(error);
  }
};

// export const validateRequestState = async ( req: Request, res: Response, next: NextFunction) => {

export const aprobeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const Request = (await RequestBook.findById(id)) as IRequestBook;
    if (!Request)
      return res.status(400).send({ message: "Request not found I" });
    // Reject other requests for the same book
    //   status: "pending" | "approved" | "rejected" | "returned" | "deleted";
    const requestedBookAprobal = await RequestBook.findOneAndUpdate(
      { _id: { $eq: id }, status: "pending" },
      { $set: { status: "approved" } },
      { new: true }
    );
    await RequestBook.findOneAndUpdate(
      { _id: { $ne: id }, status: "pending" },
      { $set: { status: "rejected" } },
      { new: true }
    );

    if (!requestedBookAprobal)
      return res.status(400).send({ message: "Request not found II" });
    console.log(requestedBookAprobal);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export const rejectRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const requestedBook = await RequestBook.findById(id);
    if (!requestedBook)
      return res.status(400).send({ message: "Request not found" });
    const rejectedRequest = await RequestBook.findByIdAndUpdate(
      { _id: { $eq: id }, status: "pending" },
      { $set: { status: "rejected" } },
      { new: true }
    );
    if (!rejectedRequest)
      return res.status(400).send({ message: "Request not found" });
    res.status(200).send({ message: "Request aproved", rejectedRequest });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAllRequests = async (req: Request, res: Response) => {
  try {
    await RequestBook.deleteMany({});
    res.status(200).send({ message: "All requests deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const validateRequestState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const Request = (await RequestBook.findById(id)) as IRequestBook;
    if (!Request)
      return res.status(400).send({ message: "Request not found V" });
    if (Request.status === "approved")
      return res.status(400).send({ message: "Request already aproved" });
    if (Request.status === "rejected") {
      return res.status(400).send({ message: "Request already rejected" });
    }
    if (Request.status === "returned") {
      return res.status(400).send({ message: "Request already returned" });
    }
    if (Request.status === "deleted") {
      return res.status(400).send({ message: "Request not found" });
    }
    next();
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
  try {
    const Request = (await RequestBook.findById(id)) as IRequestBook;
    const { bookId, userId } = Request;
    const book: IBook = (await Book.findById(bookId)) as IBook;
    const user: IUser = (await User.findById(userId)) as IUser;
    if (!book) return res.status(200).send({ error: "Book not found II" });
    if (!user) return res.status(200).send({ error: "User not found" });
    if (book.loanHistory.length > 0) {
      const lastLoan = book.loanHistory[book.loanHistory.length - 1];
      if (lastLoan.returnDate === null) {
        return res.status(200).send({ error: "Book already loaned" });
      }
    }
    const date = new Date();
    await book.update({
      $push: {
        loanHistory: { loanDate: date, userId, returnDate: null },
      },
    });
    await user.update({
      $push: {
        borrowedBooks: { bookId, loanDate: date, returnDate: null },
      },
    });
    res.status(200).send({ message: "Book loaned", Request });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const returnBook = await Book.findById(id);
    if (!returnBook) return res.status(200).send({ error: "Book not found" });
    const lastLoan = returnBook.loanHistory[returnBook.loanHistory.length - 1];
    const userId = lastLoan.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (returnBook.loanHistory.length === 0) {
      return res.status(200).send({ error: "Book not loaned" });
    }

    if (lastLoan.returnDate !== null) {
      return res.status(200).send({ error: "Book already returned" });
    }
    const returnDate = new Date();
    await Book.updateOne(
      {
        _id: { $eq: id },
        "loanHistory.userId": { $eq: userId },
        "loanHistory.returnDate": null,
      },
      { $set: { "loanHistory.$.returnDate": returnDate } }
    );

    await User.updateOne(
      { _id: { $eq: userId }, "borrowedBooks.bookId": { $eq: id } },
      { $set: { "borrowedBooks.$.returnDate": returnDate } }
    );
    //!

    const requestBook = await RequestBook.findOneAndUpdate(
      {
        bookId: { $eq: id },
        userId: { $eq: userId },
        status: { $eq: "approved" },
        returnDate: null,
      },
      { $set: { status: "returned", returnDate } },
      { new: true }
    );
    //?

    return res.status(200).send({ message: "Book returned", requestBook });
  } catch (error) {
    res.status(400).send(error);
  }
};
