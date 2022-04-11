import { Router } from "express";
import {
  createRating,
  fetchProductRatings,
  fetchRatingSingle,
} from "../controllers/reviewControllers";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/:id", validJWT, createRating);
router.get("/:id", fetchProductRatings);

router.get("/single/:id", fetchRatingSingle);

module.exports = router;
