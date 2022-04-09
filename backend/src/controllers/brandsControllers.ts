import { Response } from "express";
import Brands, { IBrand } from "../Models/Brands";

export const createBrand = async (req: any, res: Response) => {
  const { name, image } = req.body;
  try {
    const brand = await Brands.findOne({ name });

    if (brand) {
      return res
        .status(400)
        .json({ status: false, msg: "Brand already registered" });
    }

    const newBrand = await new Brands<IBrand>({
      name,
      image,
    });

    //Save user
    newBrand.save();

    return res
      .status(201)
      .json({ status: true, msg: "Brand registered", brand: newBrand });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editBrand = async (req: any, res: Response) => {
  const { name, image } = req.body;
  const { id } = req.params;
  try {
    const brand = await Brands.findById(id);

    if (!brand) {
      return res.status(400).json({ status: false, msg: "Brand not found" });
    }

    //Save user
    const brandUnique = await Brands.findOne({ name });

    if (brandUnique) {
      return res
        .status(400)
        .json({ status: false, msg: "Brand already exists" });
    }

    const updated = await Brands.findOneAndUpdate({ _id: id }, req.body, {
      returnOriginal: false,
    });

    return res
      .status(201)
      .json({ status: true, msg: "Brand updated", brand: updated });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const deleteBrand = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brands.findById(id);

    if (!brand) {
      return res.status(400).json({ status: false, msg: "Brand not found" });
    }

    await Brands.findByIdAndRemove(id);

    return res.status(201).json({ status: true, msg: "Brand deleted" });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchBrands = async (req: any, res: Response) => {
  try {
    const brands = await Brands.find();

    if (brands.length === 0) {
      return res.status(400).json({ status: false, msg: "No Brands found" });
    }

    return res.status(201).json({ status: true, brands });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchBrand = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brands.findOne({ _id: id });

    if (!brand) {
      return res.status(400).json({ status: false, msg: "No brand found" });
    }

    return res.status(201).json({ status: true, brand });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
