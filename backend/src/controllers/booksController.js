const mongoose = require("mongoose");
const Books = require("../models/books");

module.exports = {
    async find(request, response) {
        try {
            const books = await Books.find();

            response.status(200).json(books);
        } catch (error) {
            response.status(400).json({
                message: error.message,
            });
        }
    },

    async findOne(request, response) {
        const { id } = request.params;

        try {
            const book = await Books.findById(id);

            if (!book) {
                return response.status(404).json("Book not found!");
            }
            response.status(200).json(book);
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

        try {
            await Books.findByIdAndRemove(id);

            response.status(201).json({
                message: "Book deleted successfully",
            });
        } catch (error) {
            response.status(404).json({
                message: "Book not found!",
            });
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const newData = request.body;

        try {
            const data = await Books.findById(id);

            const updatedData = Object.assign(data, newData);

            await Books.findByIdAndUpdate(id, updatedData);

            response.json(updatedData);
        } catch (error) {
            response.status(404).json({
                message: error.message,
            });
        }
    },
};
