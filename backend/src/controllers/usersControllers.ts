import { Response } from "express";
import { createJWT } from "../helpers/createJWT";
import { hashPassword, isMatch } from "../helpers/passwords";
import { UserDocument } from "../Models/User";
import mongoose from "mongoose";

const User = mongoose.model<UserDocument>("User");

export const changeActiveUser = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });

    // User exists
    if (!user) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }

    // Change active state
    const updated = await User.findOneAndUpdate(
      { _id: id },
      { active: !user.active },
      {
        returnOriginal: false,
      }
    );

    return res.status(201).json({
      status: true,
      msg: "User active status changed",
      user: updated,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

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

    const updatedUser = await User.findOneAndUpdate(
      { _id: user.uid },
      req.body,
      { returnOriginal: false }
    );

    return res
      .status(201)
      .json({ status: true, msg: "User updated", user: updatedUser });
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
    const match = await isMatch(password, userFound.password!);

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
  const uid = req.params.id;
  try {
    const userObj = await User.findOne({ _id: uid }).select("-password");
    if (!userObj) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }
    const userData = {
      uid: uid,
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

export const getUserInfo = async (req: any, res: Response) => {
  const uid = req.params.id;
  try {
    const userObj = await User.findOne({ _id: uid }).select("-password");
    if (!userObj) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }
    const userData = {
      uid: uid,
      username: userObj.username,
      picture: userObj.picture,
    };

    //found
    return res.json({ status: true, msg: "User found", user: userData });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchUsersAdmin = async (req: any, res: Response) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res
        .status(400)
        .json({ status: false, msg: "User not found", users: [] });
    }

    //found
    return res.json({ status: true, msg: "Users found", users });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
