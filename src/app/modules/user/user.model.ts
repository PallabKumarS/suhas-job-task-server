import { Schema, model } from "mongoose";
import type { IUser, TUser } from "./user.interface";
import { Role } from "../../constants/constant.role";
import { UserStatus } from "../../constants/constant.status";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.STAFF,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    invitedAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});

userSchema.statics.isUserExists = async function (
  id: string,
): Promise<TUser | null> {
  const user = await this.findById(id);
  return user;
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

const UserModel = model<TUser, IUser>("User", userSchema);
export default UserModel;
