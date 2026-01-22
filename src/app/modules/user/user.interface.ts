import type { Document, Model } from "mongoose";
import type { TUserRole } from "../../constants/constant.role";
import type { TUserStatus } from "../../constants/constant.status";

export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
  isDeleted: boolean;
  invitedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Model<TUser> {
  isUserExists: (id: string) => Promise<TUser | null>;
  isPasswordMatched: (
    givenPassword: string,
    savedPassword: string,
  ) => Promise<boolean>;
}
