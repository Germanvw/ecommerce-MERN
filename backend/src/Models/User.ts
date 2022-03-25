import { Document, Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUserDocument>("User", UserSchema);
