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
const db = mongoose.connect("mongodb+srv://test:test@cluster0.u14fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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

app.listen(3000 , (req,res)=>{
    console.log("Server is running on port 3000");
})