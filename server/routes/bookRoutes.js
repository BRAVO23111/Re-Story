import express from 'express';
import { getBookById, createBook, getAllBooks } from '../controller/bookController.js';

const router = express.Router();

// Get a single book
router.get('/:id', getBookById);

// Create a new book
router.post('/', createBook);

// Get all books
router.get('/', getAllBooks);

export default router;
