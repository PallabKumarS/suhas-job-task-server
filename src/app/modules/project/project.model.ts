import { Schema, model } from "mongoose";
import type { TProject } from "./project.interface";
import { ProjectStatus } from "../../constants/constant.status";

const projectSchema = new Schema<TProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const ProjectModel = model<TProject>("Project", projectSchema);
export default ProjectModel;
