import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { USER_ROLE } from "../../constants/constant.role";

const router = Router();

// get all users
router.get("/", auth(USER_ROLE.admin), UserController.getAllUsers);

// update user role
router.patch("/:id/role", auth(USER_ROLE.admin), UserController.updateUserRole);

// update user status
router.patch(
  "/:id/status",
  auth(USER_ROLE.admin),
  UserController.updateUserStatus,
);

export const UserRoutes = router;
