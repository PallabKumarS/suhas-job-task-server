import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { InviteService } from "./invite.service";

const createInvite = catchAsync(async (req: Request, res: Response) => {
  const data = await InviteService.createInviteIntoDB(
    req.body.email,
    req.body.role,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Invite created successfully",
    data,
  });
});

export const InviteController = {
  createInvite,
};
