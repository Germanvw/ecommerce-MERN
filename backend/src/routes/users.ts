import { Router } from "express";
import {
  editUserInfo,
  editUserPassword,
  fetchUsersAdmin,
  getUserInfo,
  userRenewToken,
  changeActiveUser,
} from "../controllers/usersControllers";
import { isAdmin } from "../middlewares/isAdmin";
import { validJWT } from "../middlewares/validJWT";

const router = Router();

router.put("/", validJWT, editUserInfo);
router.put("/password", validJWT, editUserPassword);
router.put("/active/:id", validJWT, isAdmin, changeActiveUser);
router.get("/refresh/:id", validJWT, userRenewToken);
router.get("/info/:id", getUserInfo);
router.get("/all", validJWT, isAdmin, fetchUsersAdmin);

module.exports = router;
