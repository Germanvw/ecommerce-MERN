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
router.use(isAdmin);

router.post("/", createCategory);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory);
router.get("/", fetchCategories);
router.get("/:id", fetchCategory);

module.exports = router;
