import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Borrow } from "../models/borrowModel";
import { Book } from "../models/bookModel";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { book: bookId, quantity } = req.body;

        const book = await Book.findById(bookId).session(session);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        if (book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
        }

        book.copies -= quantity;
        await book.save({ session });

        const borrow = new Borrow(req.body);
        await borrow.save({ session });

        await session.commitTransaction();

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    } catch (error: any) {
        await session.abortTransaction();
        res.status(400).json({
            success: false,
            message: error.message || "Failed to borrow book",
            error,
        });
    } finally {
        session.endSession();
    }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to get borrowed summary",
      error,
    });
  }
});

