import mongoose, { Schema, model } from "mongoose";

interface ICategories {
  name: string;
  description: string;
  image: string;
  active?: boolean;
}

export interface CategoriesDocument extends ICategories, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CategoriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<CategoriesDocument>("Categories", CategoriesSchema);
