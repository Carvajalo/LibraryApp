import { Request, Response } from "express";
import Book from "../models/book";
import RequestBook from "../models/requestBook";
import User, { IUser } from "../models/user";
import { validateToken } from "../services/jwt.service";

export type userDataType = {
  id: string;
  role: string;
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

export const getAllAdmins = async (_: Request, res: Response) => {
  try {
    const users = await User.find({ role: "admin" });
    if (!users) {
      return res.status(404).send({ message: "No admins found" });
    }
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllStudents = async (_: Request, res: Response) => {
  try {
    const users = await User.find({ role: "user" });
    if (!users) {
      return res.status(404).send({ message: "No users found" });
    }
    res.send(users);
  } catch (error) {}
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(202).json(user);
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body as IUser;
  try {
    const { name, email, role, password, borrowedBooks } = updates;
    if (password)
      return res.status(400).send({ message: "Password cannot be updated" });
    if (borrowedBooks)
      return res
        .status(400)
        .send({ message: "Borrowed books cannot be updated" });
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );
    res.status(200).send({ message: `User sucessfuly update`, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = (await User.findById(id)) as IUser;
    if (!user) return res.status(404).send({ message: "User not found" });
    user.borrowedBooks.forEach(async (book) => {
      if (!book.returnDate) {
        Book.findOneAndUpdate(
          { _id: book.bookId },
          { returnDate: new Date() },
          { new: true }
        );
      }
    });

    await RequestBook.updateMany(
      { userId: { $eq: id } },
      { status: "deleted" }
    );

    await User.findByIdAndDelete(id);
    res.status(200).send({ message: `User sucessfuly deleted`, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deteteAllUsers = async (_: Request, res: Response) => {
  try {
    const user = await User.deleteMany();
    res.status(200).send({ message: `All users sucessfuly deleted`, user });
    await RequestBook.updateMany({}, { status: "deleted" });
    await Book.updateMany({}, { returnDate: new Date() });
  } catch (error) {
    res.status(400).send(error);
  }
};
