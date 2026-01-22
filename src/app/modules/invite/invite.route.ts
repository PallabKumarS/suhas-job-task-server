import { Router } from "express";
import auth from "../../middlewares/auth";
import { InviteController } from "./invite.controller";
import { USER_ROLE } from "../../constants/constant.role";

const router = Router();

router.post("/", auth(USER_ROLE.admin), InviteController.createInvite);

export const InviteRoutes = router;
