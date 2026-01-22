import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

// get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const results = await UserService.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: results.data,
    meta: results.meta,
  });
});

// update user role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.updateUserRoleIntoDB(
    req.params.id as string,
    req.body.role,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role updated successfully",
    data,
  });
});

// update user status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.updateUserStatusIntoDB(
    req.params.id as string,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User status updated successfully",
    data,
  });
});

export const UserController = {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
};
