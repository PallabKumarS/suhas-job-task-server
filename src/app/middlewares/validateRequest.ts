import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

// biome-ignore lint/suspicious/noExplicitAny: <>
const validateRequest = (schema: ZodObject<any>) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      // console.log(req.body);

      await schema.parseAsync({
        body: req.body,
      });

      next();
    },
  );
};

export default validateRequest;
