import mongoose, { Schema, model } from "mongoose";

interface PaymentMethods {
  string: "None" | "Cash" | "Credit Card" | "Paypal" | "Bitcoin";
}

interface Status {
  string: "Pending" | "Paid" | "Cancelled";
}

interface ProductReview {
  uid: string;
  rid: string;
}

export interface ProductsOrder {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  review: "None" | ProductReview;
}

interface IOrders {
  uid: string;
  paymentMethod: PaymentMethods;
  cart: ProductsOrder[] | [];
  total: number;
  delivered: boolean;
  status: Status;
  review: boolean;
}

export interface OrdersDocument extends IOrders, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema: Schema = new Schema(
  {
    uid: { type: String, required: true },
    paymentMethod: { type: String, required: true, default: "None" },
    cart: { type: Array, default: [] },
    total: { type: Number, required: true, min: 0 },
    delivered: { type: Boolean, default: false },
    status: { type: String, default: "Pending" },
    review: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<OrdersDocument>("Orders", OrdersSchema);
