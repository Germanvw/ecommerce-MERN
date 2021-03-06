import { Response } from "express";
import Categories, { CategoriesDocument } from "../Models/Categories";

export const createCategory = async (req: any, res: Response) => {
  const { name, description, image } = req.body;

  try {
    const category = await Categories.findOne({ name });

    // Category exists
    if (category) {
      return res.status(400).json({
        status: false,
        msg: "Category already exists",
      });
    }

    // Category object
    const newCategory: CategoriesDocument = new Categories({
      name,
      description,
      image,
    });

    // Save category
    const saved = await newCategory.save();

    return res.status(201).json({
      status: true,
      msg: "Category created successfully",
      category: saved,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const editCategory = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    let category = await Categories.findById(id);

    // Category exists
    if (!category) {
      return res.status(400).json({
        status: false,
        msg: "Category doesnt exist",
      });
    }

    // Validate that the name is unique
    const categoryUnique = await Categories.findOne({ name: req.params.name });
    if (categoryUnique) {
      return res.status(400).json({
        status: false,
        msg: "A category with that name already exists",
      });
    }

    // Update category
    await Categories.findOneAndUpdate({ _id: id }, req.body);

    res.status(201).json({
      status: true,
      msg: "Category updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
export const changeActiveCategory = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Categories.findById(id);

    // Category exists
    if (!category) {
      return res.status(400).json({
        status: false,
        msg: "Category doesnt exist",
      });
    }

    // Update category state
    const updated = await Categories.findOneAndUpdate(
      { _id: id },
      { active: !category.active },
      {
        returnOriginal: false,
      }
    );

    return res.status(201).json({
      status: true,
      msg: "Category active status changed",
      category: updated,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchCategory = async (req: any, res: Response) => {
  try {
    const category = await Categories.findById(req.params.id)
      .select("-createdAt")
      .select("-__v")
      .select("-updatedAt");

    if (!category) {
      return res.status(400).json({
        status: false,
        msg: "Category doesnt exist",
      });
    }

    return res.status(201).json({
      status: true,
      category,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
export const fetchCategories = async (req: any, res: Response) => {
  try {
    const categories = await Categories.find()
      .select("-createdAt")
      .select("-__v")
      .select("-updatedAt");

    if (categories.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "No categories found",
      });
    }

    return res.status(201).json({
      status: true,
      categories,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchCategoriesActive = async (req: any, res: Response) => {
  try {
    const categories = await Categories.find({ active: true })
      .select("-createdAt")
      .select("-__v")
      .select("-updatedAt");

    if (categories.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "No categories found",
      });
    }

    return res.status(201).json({
      status: true,
      categories,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
