import { Request, Response } from "express";
import Borrow from "./borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const data = await Borrow.create(payload);
    Borrow.updateBookAvailableStatus(data.book);
    res.json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};

export const getBorrowBooks = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: {
            $sum: "$quantity",
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      error,
    });
  }
};
