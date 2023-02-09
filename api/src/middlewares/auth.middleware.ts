import { Request, Response, NextFunction } from "express";
import config from "../config";
import * as jwt from "../services/jwt.service";

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
    const user = jwt.validateToken(token) as userDataType;
    console.log(req.url);
    if (user.role !== "admin") {
      return res.status(401).send({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] as string;
    const user = jwt.validateToken(token) as userDataType;
    if (!user) {
      return res.status(401).send({ message: "Not authorized" });
    }
    console.log({ userID: user.id });
    // req.body.user = user;
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
