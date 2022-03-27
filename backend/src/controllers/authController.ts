import { Request, Response } from "express";
import { createJWT } from "../helpers/createJWT";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, gender } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // User already registered
      return res
        .status(400)
        .json({ status: false, msg: "User already registered" });
    }

    //Hashing
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hashSync(password, salt);

    const picture =
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

    const newUser = await new User<IUser>({
      username,
      email,
      password: hashed,
      gender,
      picture,
      isAdmin: false,
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
    const { _id, username, isAdmin } = user;
    const token = await createJWT(_id, username, isAdmin);

    //success
    return res.json({ status: true, uid: _id, username, token });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const renewToken = async (req: any, res: any) => {
  const { uid, username, isAdmin } = req;
  try {
    const token = await createJWT(uid, username, isAdmin);
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
