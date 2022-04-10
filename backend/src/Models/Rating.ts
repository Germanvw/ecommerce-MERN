import mongoose, { Schema, model } from "mongoose";
import { UserDocument } from "./User";

export interface IRating {
  stars: string;
  comment: string;
  uid: string;
  product: string;
  active?: boolean;
}

interface RatingDocument extends IRating, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema: Schema = new Schema(
  {
    stars: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<RatingDocument>("Rating", RatingSchema);
