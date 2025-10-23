import { Request, Response } from "express";
import Book from "./book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await Book.create(payload);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book created failed",
      success: false,
      error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sort = "desc",
      limit = 10,
      sortBy = "createdAt",
      page = 1,
    } = req.query;

    const filters: any = {};
    if (filter) {
      filters.genre = filter;
    }
    const skip = (Number(page) - 1) * Number(limit);

    const books = await Book.find(filters)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filters);
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Books retrieved failed",
      success: false,
      error,
    });
  }
};

const getHighestCopiesBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ copies: -1 }).limit(6);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Highest Books Copies retrieved failed",
      success: false,
      error,
    });
  }
};
const getBookByID = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book retrieved failed",
      success: false,
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const payload = req.body;
    const data = await Book.findByIdAndUpdate(bookId, payload, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book updated failed",
      success: false,
      error,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book deleted failed",
      success: false,
      error,
    });
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getBookByID,
  updateBook,
  deleteBook,
  getHighestCopiesBooks,
};
