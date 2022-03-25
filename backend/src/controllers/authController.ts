import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/User";
import { createJWT } from "../helpers/createJWT";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      // User already registered
      return res
        .status(400)
        .json({ status: false, msg: "User already registered" });
    }

    //Hashing
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hashSync(password, salt);

    const newUser = await new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashed,
    });
    //Save user c
    newUser.save();

    return res.status(201).json({ status: true, msg: "User registered" });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Invalid password" });
    }

    //jwt
    const { _id, username } = user;
    const token = await createJWT(_id, username);

    //success
    return res.json({ status: true, uid: _id, username, token });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const renewToken = async (req: any, res: any) => {
  const { uid, username } = req;
  try {
    const token = await createJWT(uid, username);
    return res.json({ status: true, token, uid, username });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

module.exports = {
  renewToken,
  registerUser,
  loginUser,
};
