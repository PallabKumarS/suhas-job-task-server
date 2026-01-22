import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.routes";
import { ProjectRoutes } from "./app/modules/project/project.route";

const app: Application = express();

// parsers
app.use(
  cors({
    origin: [config.local_client as string, config.client as string],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes here
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/projects", ProjectRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Server is running successfully! 🚀</h1>
    </body>
    </html>
  `);
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
