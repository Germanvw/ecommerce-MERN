import { Response } from "express";
import Brands, { IBrand } from "../Models/Brands";

export const createBrand = async (req: any, res: Response) => {
  const { name, image } = req.body;
  try {
    const brand = await Brands.findOne({ name });

    // Brand exists
    if (brand) {
      return res
        .status(400)
        .json({ status: false, msg: "Brand already registered" });
    }

    // Brand object
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
  const { name } = req.body;
  const { id } = req.params;
  try {
    const brand = await Brands.findById(id);

    // Brand exists
    if (!brand) {
      return res.status(400).json({ status: false, msg: "Brand not found" });
    }

    // Save user
    const brandUnique = await Brands.findOne({ name });

    // Brand's name unique
    if (brandUnique) {
      return res
        .status(400)
        .json({ status: false, msg: "Brand already exists" });
    }

    // update
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

export const changeActiveBrand = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brands.findById(id);

    // Brand exists
    if (!brand) {
      return res.status(400).json({ status: false, msg: "Brand not found" });
    }

    // Change active state
    const updated = await Brands.findOneAndUpdate(
      { _id: id },
      { active: !brand.active },
      {
        returnOriginal: false,
      }
    );

    return res.status(201).json({
      status: true,
      msg: "Brand active status changed",
      brand: updated,
    });
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
