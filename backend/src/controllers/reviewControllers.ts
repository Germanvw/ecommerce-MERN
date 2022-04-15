import { Response } from "express";
import Orders from "../Models/Orders";
import Products from "../Models/Products";
import Review from "../Models/Review";

export const createRating = async (req: any, res: Response) => {
  const { user } = req;
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
    const rating = new Review({
      uid: user.uid,
      product: id,
      ...req.body,
    });
    await rating.save();

    // Update Order's product review ObjectID
    let reqOrd = await Orders.findOne({ _id: req.body.oid });
    let { cart } = reqOrd!;
    let newCart;
    let newOrder;
    if (cart.length > 0) {
      cart!.forEach((productItem: any) => {
        if (productItem._id === id) {
          productItem.review = { ...rating };
        }
      });
      newCart = cart;
      newOrder = await Orders.findOneAndUpdate(
        { _id: req.body.oid },
        {
          cart: newCart,
        },
        {
          returnOriginal: false,
        }
      );
    }

    // Update product's rating
    await Products.findOneAndUpdate(
      { _id: id },
      {
        totalReview: product.totalReview + 1,
        totalRating: product.totalRating + req.body.stars,
        rating:
          (product.totalRating + req.body.stars) / (product.totalReview + 1),
      }
    );

    return res.status(201).json({
      status: true,
      msg: "Rating posted successfully",
      rating,
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};

export const fetchProductRatings = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    // Get orders
    const ratings = await Review.find({ product: id });

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

export const fetchRatingSingle = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    // Get orders
    const review = await Review.findOne({ _id: id });

    if (!review) {
      return res.status(400).json({
        status: false,
        msg: "No rating found",
      });
    }

    return res.status(201).json({
      status: true,
      msg: "Rating found successfully",
      review,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error on request" });
  }
};
