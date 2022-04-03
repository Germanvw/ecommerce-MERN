import { Router } from "express";
import {
  editUserInfo,
  editUserPassword,
  userRenewToken,
} from "../controllers/usersControllers";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.put("/", editUserInfo);
router.put("/password", editUserPassword);
router.get("/refresh/:id", validJWT, userRenewToken);

module.exports = router;
