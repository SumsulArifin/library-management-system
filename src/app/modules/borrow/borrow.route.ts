import { Router } from "express";
import { borrowBook, getBorrowBooks } from "./borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", borrowBook);
borrowRouter.get("/", getBorrowBooks);

export default borrowRouter;
