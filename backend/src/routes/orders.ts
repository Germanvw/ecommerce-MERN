import { Router } from "express";
import {
  createOrder,
  editOrderDelivered,
  editOrderStatus,
  fetchOrder,
} from "../controllers/ordersControllers";
// import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.post("/", createOrder);
router.put("/:id", editOrderStatus);
router.put("/:id", editOrderDelivered);
router.get("/", fetchOrder);
// router.get("/", isAdmin, fetchOrderAll);

module.exports = router;
