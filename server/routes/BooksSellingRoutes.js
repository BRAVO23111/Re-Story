import express from 'express';
import { addBookForSale, getBooksAvailableToBuy } from '../controller/SellingController.js';

const router = express.Router();

router.get("/sale", getBooksAvailableToBuy);  
router.post("/sell", addBookForSale); 
// router.post("/buy", addBookToBuy); 

export {router as BooksSellingRoutes};