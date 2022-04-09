import mongoose, { Schema, model } from "mongoose";
import { IRating } from "./Rating";

interface IProducts {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  brand: string;
  inStock: number;
}

export interface ProductDocument extends IProducts, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProductsSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Number, required: true, min: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ProductDocument>("Products", ProductsSchema);
