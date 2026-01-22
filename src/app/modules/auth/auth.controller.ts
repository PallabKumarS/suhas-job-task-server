import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// login user controller
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// register user controller
const registerUser = catchAsync(async (req, res) => {
  const user = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

// invite user controller
const inviteUser = catchAsync(async (req, res) => {
  const { email, role } = req.body;

  const admin = req.user;

  const invitation = await AuthService.createInvitationIntoDB(
    email,
    role,
    admin.userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invitation sent successfully!",
    data: invitation,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
  inviteUser,
};
