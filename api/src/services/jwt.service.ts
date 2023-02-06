import jwt from "jsonwebtoken";
import config from "../config";
import { userDataType } from "../middlewares/auth.middleware";

const { JWT_SECRET } = config;

export const generateToken = (payload: userDataType) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const validateToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as userDataType;
};
