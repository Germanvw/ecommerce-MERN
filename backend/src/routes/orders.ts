import { Router } from "express";
import {} from "../controllers/categoriesController";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);
// router.use(isAdmin);

// router.post("/", createCategory);
// router.put("/:id", editCategory);
// router.delete("/:id", deleteCategory);
// router.get("/", fetchCategories);
// router.get("/:id", fetchCategory);

module.exports = router;
