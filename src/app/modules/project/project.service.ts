import { ProjectStatus } from "../../constants/constant.status";
import type { TMeta } from "../../utils/sendResponse";
import type { TProject } from "./project.interface";
import ProjectModel from "./project.model";

// create project
const createProjectIntoDB = async (
  payload: Partial<TProject>,
): Promise<TProject> => {
  const result = await ProjectModel.create(payload);
  return result;
};

// get all projects
const getAllProjectsFromDB = async (
  query: Record<string, unknown>,
): Promise<{ data: TProject[]; meta: TMeta }> => {
  const limit = Number(query.limit) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;

  const result = await ProjectModel.find({ isDeleted: false })
    .limit(limit)
    .skip(skip);

  if (!result.length) {
    throw new Error("No project found");
  }

  const totalDoc = await ProjectModel.countDocuments({ isDeleted: false });
  const totalPage = Math.ceil(totalDoc / limit);

  const meta = {
    page,
    limit,
    totalDoc,
    totalPage,
  };

  return {
    data: result,
    meta,
  };
};

// update project
const updateProjectIntoDB = async (
  id: string,
  payload: Partial<TProject>,
): Promise<TProject | null> => {
  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// soft delete project
const deleteProjectFromDB = async (id: string): Promise<TProject | null> => {
  const result = await ProjectModel.findByIdAndUpdate(
    id,
    { isDeleted: true, status: ProjectStatus.DELETED },
    { new: true },
  );
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
