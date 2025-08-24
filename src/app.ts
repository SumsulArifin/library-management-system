import express, { Request, Response } from "express";
import routes from "./app/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System.");
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
  next();
});
export default app;
