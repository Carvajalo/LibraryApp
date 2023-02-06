import { Request, Response, NextFunction } from "express";

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
