import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  editOrder,
  fetchOrderUser,
} from "../controllers/ordersControllers";
// import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.post("/", createOrder);
router.put("/:id", editOrder);
router.put("/cancel/:id", cancelOrder);
// router.get("/", fetchOrder);
router.get("/", fetchOrderUser);

module.exports = router;
