import { Request, Response } from "express";
import User from "../models/user";
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

export const getUser = async (req: Request, res: Response) => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const user = validateToken(token);
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(202).json(user);
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send({ message: `User sucessfuly update`, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send({ message: `User sucessfuly deleted`, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deteteAllUsers = async (_: Request, res: Response) => {
  try {
    const user = await User.deleteMany();
    res.status(200).send({ message: `All users sucessfuly deleted`, user });
  } catch (error) {
    res.status(400).send(error);
  }
};
