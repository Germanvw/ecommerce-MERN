import { Router } from "express";
import {
  editUserInfo,
  editUserPassword,
} from "../controllers/usersControllers";
import { validJWT } from "../middlewares/validJWT";

const router = Router();
router.use(validJWT);

router.put("/", editUserInfo);
router.put("/password", editUserPassword);

module.exports = router;
