import mongoose, { Schema, model } from "mongoose";

export interface IBrand {
  name: string;
  image?: string;
  active?: boolean;
}

export interface BrandsDocument extends IBrand, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const BrandsSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<BrandsDocument>("Brands", BrandsSchema);
