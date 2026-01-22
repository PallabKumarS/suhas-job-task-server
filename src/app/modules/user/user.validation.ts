import { z } from "zod";

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["ADMIN", "MANAGER", "STAFF"]),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  }),
});

export const UserValidation = {
  updateUserRoleValidationSchema,
  updateUserStatusValidationSchema,
  registerValidationSchema,
};
