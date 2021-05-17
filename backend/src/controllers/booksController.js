const mongoose = require("mongoose");
const Books = require("../models/books");

module.exports = {
    async get(request, response) {
        const { id } = request.params;

        try {
            if (id) {
                const book = await Books.findById(id);

                response.status(200).json(book);
            }

            const books = await Books.find();

            response.status(200).json(books);
        } catch (error) {
            response.status(400).json({
                message: error.message,
            });
        }
    },

    async create(request, response) {
        const { title, author, price, isbn, publisher, image } = request.body;

        const newBook = new Books({
            title,
            author,
            price,
            isbn,
            publisher,
            image,
        });

        try {
            await newBook.save();

            response.status(201).json(newBook);
        } catch (error) {
            response.status(400).json({
                message: error.message,
            });
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send("Book not found!");
        }

        await Books.findByIdAndRemove(id);

        response.status(201).json({
            message: "Book deleted successfully",
        });
    },
};
