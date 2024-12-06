import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { UserRouter } from "./routes/UserRoutes.js";
import { BooksSellingRoutes } from "./routes/BooksSellingRoutes.js";

dotenv.config();
const app = express();

const developmentOrigin = 'http://localhost:5173';
const productionOrigin = 'https://re-story1.vercel.app';

// CORS Configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? productionOrigin : developmentOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});