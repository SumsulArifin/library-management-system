import { Schema, model, Document, Model } from 'mongoose';
import { IBook, IBookModel, Genre } from '../interface/book_interface';

const bookSchema = new Schema<IBook, IBookModel>({
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    genre: { type: String, enum: Object.values(Genre), required: [true, 'Genre is required'] },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    description: { type: String },
    copies: { type: Number, required: [true, 'Number of copies is required'], min: [0, 'Copies must be a non-negative number'] },
    available: { type: Boolean, default: true },
}, { timestamps: true });

bookSchema.pre('save', function (next) {
    if (this.isModified('copies')) {
        this.available = this.copies > 0;
    }
    next();
});

bookSchema.methods.isAvailable = async function (): Promise<boolean> {
    return this.copies > 0;
};

bookSchema.statics.isBookAvailable = async function (id: string): Promise<boolean> {
    const book = await this.findById(id);
    return book ? book.copies > 0 : false;
};

export const Book = model<IBook, IBookModel>('Book', bookSchema);