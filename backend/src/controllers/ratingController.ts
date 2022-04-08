import { Response } from "express";
import Products from "../Models/Products";
import Rating from "../Models/Rating";

export const createRating = async (req: any, res: Response) => {
  const { user } = req;
  const { stars, comment } = req.body;
  const { id } = req.params;

  try {
    // Get product
    const product = await Products.findById(id);
    if (!product) {
      return res.status(400).json({
        status: false,
        msg: "Product doesnt exist",
      });
    }
    // Create rating
    const rating = new Rating({
      stars,
      comment,
      uid: user.uid,
      product: id,
    });

    await rating.save();

    return res.status(201).json({
      status: true,
      msg: "Rating posted successfully",
      rating,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchProductRatings = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    // Get orders
    const ratings = await Rating.find({ product: id });

    if (!ratings) {
      return res.status(400).json({
        status: false,
        msg: "No ratings found",
      });
    }

    return res.status(201).json({
      status: true,
      msg: "Ratings found successfully",
      ratings,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
