import { Schema, model } from "mongoose";
import type { IInvite } from "./invite.interface";
import { Role } from "../../constants/constant.role";

const inviteSchema = new Schema<IInvite>(
  {
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    token: { type: String, unique: true, required: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: Date,
  },
  { timestamps: true },
);

export const InviteModel = model<IInvite>("Invite", inviteSchema);
