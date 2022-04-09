import { Router } from "express";
import {
  createBrand,
  editBrand,
  deleteBrand,
  fetchBrands,
  fetchBrand,
} from "../controllers/brandsControllers";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/", validJWT, isAdmin, createBrand);
router.put("/:id", validJWT, isAdmin, editBrand);
router.delete("/:id", validJWT, isAdmin, deleteBrand);
router.get("/", fetchBrands);
router.get("/:id", fetchBrand);

module.exports = router;
