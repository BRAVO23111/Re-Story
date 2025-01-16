import express from 'express';
import { createPaymentIntent } from '../controller/paymentController.js';

const router = express.Router();

// Create a payment intent for Stripe checkout
router.post('/create-payment-intent', createPaymentIntent);

export  {router as PaymentRoutes};