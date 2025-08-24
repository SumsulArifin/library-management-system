import { model, Schema } from "mongoose";
import { BorrowStaticMethod, IBorrow } from "./borrow.interface";
import Book from "../books/books.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      validate: {
        validator: async function (value) {
          const book = await Book.findById(this.book);
          if (!book) return false;
          return value <= book.copies;
        },
        message: `Quantity cannot exceed available copies `,
      },
    },
    dueDate: { type: Date, required: [true, "Due date is required"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.static(
  "updateBookAvailableStatus",
  async function updateBookAvailableStatus(bookId) {
    try {
      const data = await Book.findById(bookId);
      if (!data?.copies) {
        await Book.findByIdAndUpdate(bookId, { available: false });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

borrowSchema.post("save", async function () {
  try {
    const data = await Book.findById(this.book);
    if (data) {
      await Book.findByIdAndUpdate(this.book, {
        copies: data.copies - this.quantity,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const Borrow = model<IBorrow, BorrowStaticMethod>("Borrow", borrowSchema);

export default Borrow;
