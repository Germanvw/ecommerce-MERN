import mongoose, { Schema, model } from "mongoose";

interface IOrders {
  clientId: string;
  paymentMethod: string;
  cart: [];
  total: number;
  status: boolean;
}

interface OrdersDocument extends IOrders, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema: Schema = new Schema(
  {
    clientId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cart: { type: Array, default: [] },
    total: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default model<OrdersDocument>("Products", OrdersSchema);
