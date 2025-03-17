import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

// Debug environment variables
console.log('Environment Variables:', {
    STRIPE_SECRET_KEY_EXISTS: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LENGTH: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0,
    STRIPE_SECRET_KEY_PREFIX: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 3) : null
});

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required STRIPE_SECRET_KEY environment variable');
}

let stripe;
try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16'
    });
} catch (error) {
    console.error('Stripe initialization error:', error);
    throw error;
}

// Create a checkout session for Stripe
export const createPaymentIntent = async (req, res) => {
    const { amount, currency, productId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency || 'inr',
                    product_data: {
                        name: 'Book Purchase',
                    },
                    unit_amount: Math.round(amount * 100), // Convert to cents/paise
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.VITE_URL}/success?productId=${productId}`,
            cancel_url: `${process.env.VITE_URL}/product/${productId}`,
        });

        res.status(200).json({
            success: true,
            sessionId: session.id
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
