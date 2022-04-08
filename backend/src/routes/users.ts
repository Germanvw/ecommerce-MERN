import { Router } from "express";
import {
  editUserInfo,
  editUserPassword,
  getUserInfo,
  userRenewToken,
} from "../controllers/usersControllers";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.put("/", validJWT, editUserInfo);
router.put("/password", validJWT, editUserPassword);
router.get("/refresh/:id", validJWT, userRenewToken);
router.get("/info/:id", getUserInfo);

module.exports = router;
