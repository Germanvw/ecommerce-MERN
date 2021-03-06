import { Request, Response } from "express";
import { createJWT } from "../helpers/createJWT";
import { hashPassword, isMatch } from "../helpers/passwords";
import User, { IUser } from "../Models/User";

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

    // Hashing
    const hashed = await hashPassword(password);

    // Default Picture
    const picture =
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

    // Create user's object
    const newUser = await new User<IUser>({
      username,
      email,
      password: hashed,
      gender,
      picture,
      isAdmin: false,
    });

    //Save user db
    newUser.save();

    return res.status(201).json({ status: true, msg: "User registered" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // User exists
    if (!user) {
      return res.status(400).json({ status: false, msg: "User not found" });
    }

    // User active
    if (!user.active) {
      return res.status(400).json({ status: false, msg: "User not active" });
    }

    // Compare password
    const match = await isMatch(password, user.password!);

    if (!match) {
      return res.status(400).json({ status: false, msg: "Invalid password" });
    }

    // Creates user object
    const userData = {
      uid: user._id.toString(),
      username: user.username,
      email: user.email,
      gender: user.gender,
      picture: user.picture,
      isAdmin: user.isAdmin,
      active: user.active,
    };

    //jwt
    const token = await createJWT(userData);

    //success
    return res.json({ status: true, user: userData, token });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const renewToken = async (req: any, res: any) => {
  const { user } = req;
  try {
    const token = await createJWT(user);

    return res.json({ status: true, user, token });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

module.exports = {
  renewToken,
  registerUser,
  loginUser,
};
