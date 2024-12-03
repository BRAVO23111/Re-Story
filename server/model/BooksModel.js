import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: false,
    },
    transactionType: {
        type: String,
        enum: ['buy', 'sell'], // Specifies whether the book is listed for buying or selling
        required: true,
    },
    sellerDetails: {
        type: String, // Store additional info about the seller (e.g., contact details)
        required: false,
    },
    condition :{
        type : String, // Store additional info about the
        enum : ['New', 'Like new', 'Good', 'Acceptable', 'Damaged'], // Condition of the book
        required: true,
    },
    sold: {
        type: Boolean, // Indicates whether the book is sold
        default: false, // Defaults to not sold
        required: true,
    },
});

const Books = mongoose.model('Books', bookSchema);

export default Books;
