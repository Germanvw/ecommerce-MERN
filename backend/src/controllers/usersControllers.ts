import { Response } from "express";
import mongoose from "mongoose";
import { createJWT } from "../helpers/createJWT";
import { hashPassword, isMatch } from "../helpers/passwords";
import { UserDocument } from "../Models/User";

const User = mongoose.model<UserDocument>("User");

export const editUserInfo = async (req: any, res: Response) => {
  let { email } = req.body;
  const { user } = req;
  try {
    // Get user information
    const userFound = await User.findOne({ _id: user.uid }).select("-password");
    if (!userFound) {
      return res.status(400).json({ status: false, msg: "Cannot find user" });
    }
    // Check if user wants to change email and if its avaliable
    if (email) {
      // User submit an email change
      const emailUnique = await User.findOne({ email }).select("-password");

      if (emailUnique && emailUnique._id.toString() !== user.uid) {
        // The email is used in a different account
        return res
          .status(400)
          .json({ status: false, msg: "Email already used in other account" });
      }
    }

    await User.findOneAndUpdate({ _id: user.uid }, req.body);

    return res.status(201).json({ status: true, msg: "User updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editUserPassword = async (req: any, res: Response) => {
  const { password, newPassword } = req.body;
  const { user } = req;
  try {
    const userFound = await User.findOne({ _id: user.uid });

    if (!userFound) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }
    // Validate old password
    const match = await isMatch(password, userFound.password);

    if (!match) {
      return res.status(400).json({ status: false, msg: "Invalid password" });
    }

    // Hashing new password
    const hashed = await hashPassword(newPassword);
    await User.findOneAndUpdate({ _id: user.uid }, { password: hashed });

    return res.status(201).json({ status: true, msg: "Password updated" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const userRenewToken = async (req: any, res: Response) => {
  const { user } = req;

  try {
    const userObj = await User.findOne({ email: user.email }).select(
      "-password"
    );

    if (!userObj) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }

    const userData = {
      uid: userObj._id.toString(),
      username: userObj.username,
      email: userObj.email,
      gender: userObj.gender,
      picture: userObj.picture,
      isAdmin: userObj.isAdmin,
    };

    //jwt
    const token = await createJWT(userData);

    //success
    return res.json({ status: true, user: userData, token });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
