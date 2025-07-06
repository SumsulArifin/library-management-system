
import express,{ Request, Response }  from "express";
import { Book } from "../models/bookModel";
import { z } from 'zod';


export const bookRoutes = express.Router();

const CreateBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
  ]),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().min(0, 'Copies must be a positive number'),
  available: z.boolean()
});


bookRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const validatedBody = CreateBookZodSchema.parse(req.body);
    const newBook = await Book.create(validatedBody);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

bookRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit = '10' } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = { $regex: new RegExp(filter as string, 'i') };
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sort === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const books = await Book.find(query).sort(sortOptions).limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
