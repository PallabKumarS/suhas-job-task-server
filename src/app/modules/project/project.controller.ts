import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

// create project
const createProject = catchAsync(async (req: Request, res: Response) => {
  const data = await ProjectService.createProjectIntoDB({
    ...req.body,
    createdBy: req.user.id,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data,
  });
});

// get all projects
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const data = await ProjectService.getAllProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: data.data,
    meta: data.meta,
  });
});

// update project
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const data = await ProjectService.updateProjectIntoDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project updated successfully",
    data,
  });
});

// delete project (soft delete)
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const data = await ProjectService.deleteProjectFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project deleted successfully",
    data,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
