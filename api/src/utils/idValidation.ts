import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

export const validateParamsId = (
  req: Request & { params: { id: string } },
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ message: "Invalid book ID" });
  }
  next();
};

export const validateBodyId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }
  next();
};

export const agregation = [
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: "$user",
  },
  {
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "book",
    },
  },
  {
    $unwind: "$book",
  },
  {
    $project: {
      bookId: 1,
      userId: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      "user.name": 1,
      "user.email": 1,
      "book.title": 1,
      "book.author": 1,
      "book.ISBN": 1,
    },
  },
];

export const userBorrowedBooksAgregation = (id: ObjectId) => {
  return [
    {
      $match: {
        _id: id,
        "borrowedBooks.returnDate": null,
      },
    },
    {
      $project: {
        borrowedBooks: {
          $filter: {
            input: "$borrowedBooks",
            as: "borrowedBook",
            cond: { $eq: ["$$borrowedBook.returnDate", null] },
          },
        },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "borrowedBooks.bookId",
        foreignField: "_id",
        as: "books",
      },
    },
    {
      $unwind: "$books",
    },
    {
      $project: {
        _id: "$books._id",
        title: "$books.title",
        author: "$books.author",
        returnDate: "$books.loanHistory.returnDate",
      },
    },
    {
      $unwind: "$returnDate",
    },
  ];
};
