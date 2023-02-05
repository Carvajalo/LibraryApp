import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";

const { JWT_SECRET } = config;
export type userDataType = {
  id: string;
  role: string;
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send({ message: "Successfully registered" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Admin with this email already exists" });
    }
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.send({ message: "Admin successfully registered" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await user.comparePassword(String(password));
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }
    const payload: userDataType = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const logOut = async (req: Request, res: Response) => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.send({ message: "Successfully logged out", user });
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};
