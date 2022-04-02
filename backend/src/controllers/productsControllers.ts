import { Response } from "express";
import Products, { ProductDocument } from "../Models/Products";

export const createProduct = async (req: any, res: Response) => {
  const { name, description, image, price, inStock, category } = req.body;

  try {
    const newProduct: ProductDocument = new Products({
      name,
      description,
      image,
      price,
      inStock,
      category,
    });

    const saved = await newProduct.save();

    return res.status(201).json({
      status: true,
      msg: "Product created successfully",
      product: saved,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editProduct = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    let product = await Products.findById(id);

    if (!product) {
      return res.status(400).json({
        status: false,
        msg: "Product doesnt exist",
      });
    }
    const newProduct = await Products.findOneAndUpdate({ _id: id }, req.body, {
      returnOriginal: false,
    }).populate("category");

    res.status(201).json({
      status: true,
      msg: "Product updated successfully",
      product: newProduct,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const deleteProduct = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);

    if (!product) {
      return res.status(400).json({
        status: false,
        msg: "Product doesnt exist",
      });
    }

    await Products.findByIdAndDelete(id);

    return res.status(201).json({
      status: true,
      msg: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
export const fetchProduct = async (req: any, res: Response) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        status: false,
        msg: "Product doesnt exist",
      });
    }

    return res.status(201).json({
      status: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
export const fetchProducts = async (req: any, res: Response) => {
  try {
    const products = await Products.find().populate("category");
    if (products.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "No Products found",
      });
    }

    return res.status(201).json({
      status: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
