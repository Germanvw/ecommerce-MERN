import mongoose, { Schema, model } from "mongoose";

interface PaymentMethods {
  string: "cash" | "creditCard" | "paypal" | "bitcoin";
}

interface Status {
  string: "pending" | "paid" | "cancelled";
}

export interface ProductsOrder {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IOrders {
  uid: string;
  paymentMethod: PaymentMethods;
  cart: ProductsOrder[] | [];
  total: number;
  delivered: boolean;
  status: Status;
}

export interface OrdersDocument extends IOrders, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema: Schema = new Schema(
  {
    uid: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cart: { type: Array, default: [] },
    total: { type: Number, required: true, min: 0 },
    delivered: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default model<OrdersDocument>("Orders", OrdersSchema);
