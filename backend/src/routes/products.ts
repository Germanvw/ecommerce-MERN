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
router.use(validJWT);

router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, editProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

module.exports = router;
