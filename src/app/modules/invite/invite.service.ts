import crypto from "node:crypto";
import { InviteModel } from "./invite.model";
import type { Role } from "../../constants/constant.role";
import { sendInviteEmail } from "../../utils/sendMail";

const createInviteIntoDB = async (email: string, role: Role) => {
  const token = crypto.randomUUID();

  const result = await InviteModel.create({
    email,
    role,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await sendInviteEmail(email, "Invitation", `Invite Token: ${token}`);

  return result;
};

const findValidInviteFromDB = async (token: string) => {
  return InviteModel.findOne({
    token,
    acceptedAt: null,
    expiresAt: { $gt: new Date() },
  });
};

const markInviteAccepted = async (id: string) => {
  return InviteModel.findByIdAndUpdate(
    id,
    { acceptedAt: new Date() },
    { new: true },
  );
};

export const InviteService = {
  createInviteIntoDB,
  findValidInviteFromDB,
  markInviteAccepted,
};
