import { Request, Response } from "express";
import { userDataType } from "../middlewares/auth.middleware";
import User, { IUser } from "../models/user";
import { generateToken, validateToken } from "../services/jwt.service";

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
    const user: IUser =
      ((await User.findOne({ email })) as IUser) ||
      ((await User.findOne({ name: email })) as IUser);
    if (!user) {
      return res.status(400).send({ message: "Email or Username incorrect" });
    }
    const isMatch = await user.comparePassword(String(password));
    if (!isMatch) {
      return res.status(400).send({ message: "Password is incorrect" });
    }
    const { role, name } = user;
    const payload: userDataType = {
      id: user._id,
      role,
      name,
    };
    const token = generateToken(payload);

    res.send({ token, role, name });
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
    const user = validateToken(token);
    res.send({ message: "Successfully logged out", user });
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};
