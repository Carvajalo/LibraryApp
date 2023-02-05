import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const { JWT_SECRET } = config;

export type userDataType = {
  id: string;
  role: string;
};

export const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const user = jwt.verify(token, JWT_SECRET) as userDataType;
    console.log(req.url);
    req.body.user = user;
    if (user.role !== "admin") {
      return res.status(401).send({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};
