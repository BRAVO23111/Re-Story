import express from 'express';
import { addBookForSale, getBooksAvailableToBuy, getBookById } from '../controller/SellingController.js';

const router = express.Router();

// Specific routes first
router.get("/sale", getBooksAvailableToBuy);  
router.post("/sell", addBookForSale); 

// Parameterized routes last
router.get("/:id", getBookById);  

export {router as BooksSellingRoutes};