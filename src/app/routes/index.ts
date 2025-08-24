import { Router } from "express";
import booksRouter from "../modules/books/books.route";
import borrowRouter from "../modules/borrow/borrow.route";

const routes = Router();

routes.use("/api/books", booksRouter);
routes.use("/api/borrow", borrowRouter);

export default routes;
