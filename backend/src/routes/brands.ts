import { Router } from "express";
import {
  createBrand,
  editBrand,
  changeActiveBrand,
  fetchBrands,
  fetchBrand,
} from "../controllers/brandsControllers";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/", validJWT, isAdmin, createBrand);
router.put("/:id", validJWT, isAdmin, editBrand);
router.put("/active/:id", validJWT, isAdmin, changeActiveBrand);
router.get("/", fetchBrands);
router.get("/:id", fetchBrand);

module.exports = router;
