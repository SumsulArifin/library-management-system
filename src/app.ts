import express, { Request, Response } from "express";
import routes from "./app/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-frontend-mu.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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
