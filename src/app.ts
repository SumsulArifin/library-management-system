import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();

//middleware
app.use([
  cors({
    origin: [
      "https://library-management-system-frontend-azure-beta.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
  express.json(),
]);

//routes
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Library Management System Server",
  });
});
