import { Request, Response } from "express";
import app from "../app";

export const notSupported = (req: Request, res: Response) => {
  res.send({
    message: `Method ${
      req.method
    } is not supported on http://localhost:${app.get("PORT")}${
      req.originalUrl
    }`,
  });
};
