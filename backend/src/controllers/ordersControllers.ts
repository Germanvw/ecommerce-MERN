import { Response } from "express";
import { cartTotal } from "../helpers/cartTotal";
import { validateProducts, handleStock } from "../helpers/validateStock";
import Orders, { OrdersDocument } from "../Models/Orders";

export const createOrder = async (req: any, res: Response) => {
  const { user } = req;
  const { cart } = req.body;
  try {
    const newOrder: OrdersDocument = new Orders({
      uid: user.uid,
      ...req.body,
      total: cartTotal(cart),
    });

    // Validate avalability of products
    const avalability = await validateProducts(newOrder);

    if (!avalability.status) {
      return res.status(400).json({
        status: false,
        msg: avalability.msg,
      });
    }
    // Update stock
    await handleStock(newOrder, "create");

    // Save order
    const saved = await newOrder.save();

    //

    return res.status(201).json({
      status: true,
      msg: "Order created successfully",
      order: saved,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editOrder = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    let order = await Orders.findById(id);

    if (!order) {
      return res.status(400).json({
        status: false,
        msg: "Order doesnt exist",
      });
    }

    // Validate that the name is unique
    await Orders.findOneAndUpdate({ _id: id }, req.body);

    res.status(201).json({
      status: true,
      msg: "Order updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchOrder = async (req: any, res: Response) => {
  return true;
};
