import type { Types } from "mongoose";
import type { Role } from "../../constants/constant.role";

export interface IInvite {
  invitedBy: Types.ObjectId;
  email: string;
  role: Role;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
}
