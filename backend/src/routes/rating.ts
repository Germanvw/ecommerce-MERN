import { Router } from "express";
import {
  createRating,
  fetchProductRatings,
} from "../controllers/ratingController";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/:id", validJWT, createRating);
router.get("/:id", fetchProductRatings);

module.exports = router;
