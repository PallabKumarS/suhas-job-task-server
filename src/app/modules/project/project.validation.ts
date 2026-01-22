import { z } from "zod";

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
