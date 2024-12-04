import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { UserRouter } from "./routes/UserRoutes.js";
import { BooksSellingRoutes } from "./routes/BooksSellingRoutes.js";


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
const db = mongoose.connect(process.env.MONGO_URI)
try {
    if(db){
        console.log("database connected");
    }
} catch (error) {
    console.log(error);
}

app.use("/api/auth" , UserRouter);
app.use("/api/books" , BooksSellingRoutes);
app.get('/' ,(req,res)=>{
    res.send("Hello World");
})
const PORT = 3000 || process.env.PORT
app.listen(PORT , (req,res)=>{
    console.log(`Server running on port ${PORT}`);
})