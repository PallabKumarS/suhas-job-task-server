import type { TMeta } from "../../utils/sendResponse";
import type { TUser } from "./user.interface";
import UserModel from "./user.model";

// get all users
const getAllUsersFromDB = async (
  query: Record<string, unknown>,
): Promise<{ data: TUser[]; meta: TMeta }> => {
  const limit = Number(query.limit) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;

  const result = await UserModel.find({}).skip(skip).limit(limit);

  const totalDoc = await UserModel.countDocuments();
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

// update user role
const updateUserRoleIntoDB = async (
  id: string,
  role: string,
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
  return result;
};

// update user status
const updateUserStatusIntoDB = async (
  id: string,
  status: string,
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return result;
};

export const UserService = {
  getAllUsersFromDB,
  updateUserRoleIntoDB,
  updateUserStatusIntoDB,
};
