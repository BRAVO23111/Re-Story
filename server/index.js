import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { UserRouter } from "./routes/UserRoutes.js";
import { BooksSellingRoutes } from "./routes/BooksSellingRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const app = express();

// Define allowed origins
const allowedOrigins = [
    'https://re-story1.vercel.app',
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
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

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
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});