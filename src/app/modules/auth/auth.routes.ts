import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { AuthValidation } from "./auth.validation";
import { USER_ROLE } from "../../constants/constant.role";
import { UserValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  "/register",
  validateRequest(UserValidation.registerValidationSchema),
  AuthController.registerUser,
);

router.post(
  "/invite",
  auth(USER_ROLE.admin),
  validateRequest(AuthValidation.inviteUserValidationSchema),
  AuthController.inviteUser,
);

export const AuthRoutes = router;
