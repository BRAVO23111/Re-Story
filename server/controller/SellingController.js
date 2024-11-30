import Books from "../model/BooksModel.js";

// Get all books available to buy (books listed for sale)
export const getBooksAvailableToBuy = async (req, res) => {
    try {
        const availableBooks = await Books.find({ transactionType: "sell", sold: false }); // Only unsold books
        res.status(200).json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a book for sale
export const addBookForSale = async (req, res) => {
    const { title, author, publicationYear, genre, price, imageURL } = req.body;

    const newBook = new Books({
        title,
        author,
        publicationYear,
        genre,
        price,
        imageURL,
        transactionType: "sell",
        sold: false, // Default to unsold
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mark a book as sold
// export const markBookAsSold = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const updatedBook = await Books.findByIdAndUpdate(
//             id,
//             { sold: true }, // Set sold to true
//             { new: true } // Return the updated document
//         );

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         res.status(200).json({
//             message: "Book marked as sold successfully",
//             book: updatedBook,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
