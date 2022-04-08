import { Router } from "express";
import {
  createCategory,
  editCategory,
  deleteCategory,
  fetchCategories,
  fetchCategory,
} from "../controllers/categoriesController";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.post("/", isAdmin, createCategory);
router.put("/:id", isAdmin, editCategory);
router.delete("/:id", isAdmin, deleteCategory);
router.get("/", fetchCategories);
router.get("/:id", fetchCategory);

module.exports = router;
