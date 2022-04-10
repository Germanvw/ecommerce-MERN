import { Router } from "express";
import {
  createCategory,
  editCategory,
  changeActiveCategory,
  fetchCategories,
  fetchCategory,
} from "../controllers/categoriesController";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.post("/", validJWT, isAdmin, createCategory);
router.put("/:id", validJWT, isAdmin, editCategory);
router.put("/active/:id", validJWT, isAdmin, changeActiveCategory);
router.get("/", fetchCategories);
router.get("/:id", fetchCategory);

module.exports = router;
