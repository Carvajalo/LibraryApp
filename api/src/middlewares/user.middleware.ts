import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { userDataType } from "../controllers/user.controller";

export const isUserLoggedIn = async (
  req: Request & { user: userDataType },
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
