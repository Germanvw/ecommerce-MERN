import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  uid?: string;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  gender: string;
  picture: string;
  active?: boolean;
}

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    picture: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    active: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

export default model<UserDocument>("User", UserSchema);
