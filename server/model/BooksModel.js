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
    description: {
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
    condition: {
        type: String,
        enum: ['New', 'Like new', 'Good', 'Acceptable', 'Damaged'],
        required: true,
    },
    sold: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const Books = mongoose.model('Books', bookSchema);

export default Books;
