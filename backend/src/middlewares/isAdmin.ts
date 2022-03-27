import { Response, NextFunction } from "express";

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Authentication token doesnt exist",
    });
  }

  try {
    if (!req.isAdmin) {
      return res.status(401).json({
        status: false,
        msg: "You are not an admin",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      msg: "Invalid token",
    });
  }

  next();
};
