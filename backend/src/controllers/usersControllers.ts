import { Response } from "express";
import mongoose from "mongoose";
import { hashPassword, isMatch } from "../helpers/passwords";
import { UserDocument } from "../Models/User";

const User = mongoose.model<UserDocument>("User");

export const editUserInfo = async (req: any, res: Response) => {
  let { email } = req.body;
  const { uid } = req;
  try {
    // Get user information
    const user = await User.findOne({ _id: uid }).select("-password");
    if (!user) {
      return res.status(400).json({ status: false, msg: "Cannot find user" });
    }

    // Check if user wants to change email and if its avaliable
    if (email) {
      // User submit an email change
      const emailUnique = await User.findOne({ email }).select("-password");

      if (emailUnique && emailUnique._id.toString() !== uid) {
        // The email is used in a different account
        return res
          .status(400)
          .json({ status: false, msg: "Email already used in other account" });
      }
    }

    await User.findOneAndUpdate({ _id: uid }, req.body);

    return res.status(201).json({ status: true, msg: "User updated" });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editUserPassword = async (req: any, res: Response) => {
  const { password, newPassword } = req.body;
  const { uid } = req;
  try {
    const user = await User.findOne({ _id: uid });
    if (!user) {
      return res.status(400).json({ status: false, msg: "Cannot find user" });
    }

    // Validate old password
    const match = isMatch(password, user.password);

    if (!match) {
      return res.status(400).json({ status: false, msg: "Invalid password" });
    }

    // Hashing new password
    const hashed = await hashPassword(password);
    await User.findOneAndUpdate({ _id: uid }, { password: hashed });

    return res.status(201).json({ status: true, msg: "Password updated" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
