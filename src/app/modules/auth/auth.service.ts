import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import {
  createToken,
  generateInvitationToken,
  verifyToken,
} from "./auth.utils";
import type { TLoginUser } from "./auth.interface";
import { sendInviteEmail } from "../../utils/sendMail";
import UserModel from "../user/user.model";
import { InviteModel } from "../invite/invite.model";
import type { TUserRole } from "../../constants/constant.role";
import mongoose from "mongoose";

// login user here
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne(
    { email: payload.email },
    {
      password: 1,
      role: 1,
      email: 1,
      status: 1,
      isDeleted: 1,
    },
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is active
  if (user.status !== "ACTIVE") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deactivated !");
  }

  // checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      user?.password as string,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match");
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// register user
const registerUser = async (payload: {
  name: string;
  password: string;
  token: string;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const findInvitation = await InviteModel.findOne({
      token: payload.token,
    }).session(session);

    if (!findInvitation) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid invitation. Check the link again or contact admin.",
      );
    }

    if (findInvitation.acceptedAt) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invitation already accepted.",
      );
    }

    if (findInvitation.expiresAt < new Date()) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invitation expired.");
    }

    const decoded = verifyToken(
      payload.token,
      config.jwt_access_secret as string,
    );

    const findUser = await UserModel.findOne({ email: decoded.email }).session(
      session,
    );

    if (findUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User already exist.");
    }

    const newUser = await UserModel.create(
      [
        {
          name: payload.name,
          email: decoded.email,
          password: payload.password,
          role: decoded.role,
          invitedAt: new Date(findInvitation.createdAt),
        },
      ],
      { session },
    );

    if (!newUser.length) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create user",
      );
    }

    findInvitation.acceptedAt = new Date();
    findInvitation.token = "";
    const updatedInvitation = await findInvitation.save({ session });
    if (!updatedInvitation) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update invitation",
      );
    }

    await session.commitTransaction();
    session.endSession();

    return newUser[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Invite user (admin)
const createInvitationIntoDB = async (
  email: string,
  role: TUserRole,
  adminId: string,
) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const token = generateInvitationToken(
    { email, role },
    String(config.jwt_access_secret),
    "24h",
  );

  const newInvitation = await InviteModel.create({
    invitedBy: adminId,
    email,
    role,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    token,
  });

  if (!newInvitation) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create invitation",
    );
  }

  const frontendUrl = `${config.client}/register?token=${token}`;

  const info = await sendInviteEmail(email, frontendUrl);

  if (!(info.accepted.length > 0)) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to send invitation email",
    );
  }

  return newInvitation;
};

export const AuthService = {
  loginUser,
  registerUser,
  createInvitationIntoDB,
};
