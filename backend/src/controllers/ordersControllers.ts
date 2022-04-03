import { Response } from "express";
import { cartTotal } from "../helpers/cartTotal";
import { validateProducts, handleStock } from "../helpers/validateStock";
import Orders, { OrdersDocument } from "../Models/Orders";

export const createOrder = async (req: any, res: Response) => {
  const { user } = req;

  try {
    const newOrder: OrdersDocument = new Orders({
      uid: user.uid,
      cart: req.body,
      paymentMethod: "Cash",
      total: cartTotal(req.body),
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
  const { user } = req;
  try {
    let order = await Orders.findById(id);

    if (!order) {
      return res.status(400).json({
        status: false,
        msg: "Order doesnt exist",
      });
    }

    // Validate authorization
    if (order.uid !== user.uid && user.isAdmin !== true) {
      return res.status(401).json({
        status: false,
        msg: "Unauthorized",
      });
    }

    // Validate that the name is unique
    const updatedOrder = await Orders.findOneAndUpdate({ _id: id }, req.body, {
      returnOriginal: false,
    });

    res.status(201).json({
      status: true,
      msg: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const cancelOrder = async (req: any, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  try {
    let order = await Orders.findById(id);

    if (!order) {
      return res.status(400).json({
        status: false,
        msg: "Order doesnt exist",
      });
    }

    // Validate authorization
    if (order.uid !== user.uid && user.isAdmin !== true) {
      return res.status(401).json({
        status: false,
        msg: "Unauthorized",
      });
    }

    // Validate that the name is unique
    const updatedOrder = await Orders.findOneAndUpdate(
      { _id: id },
      { status: "Cancelled" },
      {
        returnOriginal: false,
      }
    );

    // Update stock
    await handleStock(order, "cancel");

    res.status(201).json({
      status: true,
      msg: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchOrderUser = async (req: any, res: Response) => {
  const { user } = req;

  try {
    const orders = await Orders.find({ uid: user.uid })
      .select("-createdAt")
      .select("-__v")
      .select("-updatedAt");

    if (orders.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "No Orders found",
      });
    }

    return res.status(201).json({
      status: true,
      orders,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
