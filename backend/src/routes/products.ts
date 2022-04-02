import { Router } from "express";
import {
  createProduct,
  editProduct,
  deleteProduct,
  fetchProducts,
  fetchProduct,
} from "../controllers/productsControllers";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/", validJWT, isAdmin, createProduct);
router.put("/:id", validJWT, isAdmin, editProduct);
router.delete("/:id", validJWT, isAdmin, deleteProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

module.exports = router;
