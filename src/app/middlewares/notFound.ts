/* eslint-disable @typescript-eslint/no-unused-vars */

import type { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (_req, res, _next): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;
