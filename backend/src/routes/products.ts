import { Router } from "express";
import {
  createProduct,
  editProduct,
  changeActiveProduct,
  fetchProducts,
  fetchProduct,
} from "../controllers/productsControllers";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/", validJWT, isAdmin, createProduct);
router.put("/:id", validJWT, isAdmin, editProduct);
router.put("/active/:id", validJWT, isAdmin, changeActiveProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

module.exports = router;
