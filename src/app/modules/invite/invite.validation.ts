import { z } from "zod";

const createInviteValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }),
    role: z.enum(["ADMIN", "MANAGER", "STAFF"]),
  }),
});

export const InviteValidation = {
  createInviteValidationSchema,
};
