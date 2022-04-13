import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const validJWT = (req: any, res: Response, next: NextFunction) => {
  //x-token headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      status: false,
    });
  }

  try {
    const { user } = jwt.verify(token, process.env.PRIVATE_KEY);
    // Guardo los datos importantes
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: false,
      msg: "Invalid token",
    });
  }

  next();
};
