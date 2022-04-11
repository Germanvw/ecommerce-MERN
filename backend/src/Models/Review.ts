import mongoose, { Schema, model } from "mongoose";

export interface IReview {
  uid: string;
  stars: string;
  comment: string;
  product: string;
  active?: boolean;
}

interface ReviewDocument extends IReview, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    oid: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<ReviewDocument>("Review", ReviewSchema);
