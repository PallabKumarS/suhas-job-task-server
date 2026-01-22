import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProjectController } from "./project.controller";
import { USER_ROLE } from "../../constants/constant.role";

const router = Router();

// create project (all authenticated users)
router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.staff),
  ProjectController.createProject,
);

// get all projects
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.manager),
  ProjectController.getAllProjects,
);

// update project (admin only)
router.patch("/:id", auth(USER_ROLE.admin), ProjectController.updateProject);

// delete project (admin only)
router.delete("/:id", auth(USER_ROLE.admin), ProjectController.deleteProject);

export const ProjectRoutes = router;
