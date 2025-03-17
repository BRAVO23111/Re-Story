import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

// Check for required environment variables
if (!process.env.STRIPE_SECRET_KEY || !process.env.MONGO_URI) {
    console.error('Missing required environment variables');
    process.exit(1);
}

import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import { UserRouter } from "./routes/UserRoutes.js";
import { BooksSellingRoutes } from "./routes/BooksSellingRoutes.js";
import { PaymentRoutes } from "./routes/PaymentRoutes.js";
import { ProfileRoute } from './routes/ProfileRoutes.js';

const app = express();

// Define allowed origins
const allowedOrigins = [
    'https://re-story1.vercel.app',
    'https://re-story-1.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000'
];

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With', 
        'Accept', 
        'Origin'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Additional headers for extra security and CORS handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
} catch (error) {
    console.log("Database connection error:", error);
}

// Global error handler for CORS
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({
            message: 'CORS not allowed for this origin'
        });
    } else {
        next(err);
    }
});

// Routes
app.use("/api/auth", UserRouter);
app.use("/api/books", BooksSellingRoutes);
app.use("/api/payments" , PaymentRoutes);
app.use("/api/profile" , ProfileRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});