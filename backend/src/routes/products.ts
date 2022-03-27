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
router.use(isAdmin);

router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

module.exports = router;
