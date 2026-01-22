import type { Types } from "mongoose";
import type { TProjectStatus } from "../../constants/constant.status";

export type TProject = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  status: TProjectStatus;
  isDeleted: boolean;
  createdBy: Types.ObjectId;
};
