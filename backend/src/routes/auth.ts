import { Router } from "express";
import {
  loginUser,
  registerUser,
  renewToken,
} from "../controllers/authController";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", validJWT, renewToken);

module.exports = router;
