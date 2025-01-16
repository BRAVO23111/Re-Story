import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

// Debug log to check if we're getting the key
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});

// Create a payment intent for Stripe checkout
export const createPaymentIntent = async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency || 'inr',
            payment_method_types: ['card'],
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
