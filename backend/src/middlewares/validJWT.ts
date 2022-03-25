import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const validJWT = (req: any, res: Response, next: NextFunction) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Authentication token doesnt exist",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.PRIVATE_KEY);

    // Guardo los datos importantes
    req.uid = uid;
    req.username = name;
  } catch (err) {
    return res.status(401).json({
      status: false,
      msg: "Invalid token",
    });
  }

  next();
};
