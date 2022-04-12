import mongoose, { Schema, model } from "mongoose";

interface IProducts {
  name: string;
  description: string;
  image: string;
  category: { active: boolean };
  brand: { active: boolean };
  price: number;
  inStock: number;
  totalSold: number;
  totalReview: number;
  rating: number;
  active?: boolean;
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
    rating: {
      type: Number,
      default: 0,
    },
    totalReview: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<ProductDocument>("Products", ProductsSchema);
