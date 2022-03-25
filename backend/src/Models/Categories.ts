import { Document, Schema, model } from "mongoose";

interface ICategories {
  name: string;
  description: string;
  image: string;
}

interface ICategoriesDocument extends Document, ICategories {
  createdAt: Date;
  updatedAt: Date;
}

const CategoriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ICategoriesDocument>("Categories", CategoriesSchema);
