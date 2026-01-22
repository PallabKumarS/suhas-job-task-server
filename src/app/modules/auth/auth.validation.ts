import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      message: "Old password is required",
    }),
    newPassword: z.string({ message: "Password is required" }),
  }),
});

const inviteUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }),
    role: z.string({ message: "Role is required" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  inviteUserValidationSchema,
};
