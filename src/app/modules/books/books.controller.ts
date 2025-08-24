import { Request, Response } from "express";
import Book from "./books.model";

export const createBook = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const data = await Book.create(payload);
    res.json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: "Failed to create the book",
      ...error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const {
    filter,
    sortBy = "createdAt",
    sort = "asc",
    limit = 10,
  }: {
    filter?: string;
    sortBy?: string;
    sort?: "asc" | "desc";
    limit?: number;
  } = req.query;

  const filterQuery = filter ? { genre: filter } : {};

  try {
    const data = await Book.find(filterQuery)
      .sort([[sortBy, sort]])
      .limit(limit);
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to retrived books",
      error,
    });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const data = await Book.findById(bookId);
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to get the book",
      error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const payload = req.body;
  try {
    const data = await Book.findByIdAndUpdate(bookId, payload, {
      runValidators: true,
      new: true,
    });
    res.json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const data = await Book.findByIdAndDelete(bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to delete the book",
      error,
    });
  }
};
