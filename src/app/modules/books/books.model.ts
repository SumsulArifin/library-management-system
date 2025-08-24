import { model, Schema } from "mongoose";
import { IBook } from "./books.interface";
import generateISBN from "../../utils/generateISBN";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [1, "At least one copy is required"],
    },
    available: { type: Boolean },
    description: { type: String, trim: true },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, or FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
