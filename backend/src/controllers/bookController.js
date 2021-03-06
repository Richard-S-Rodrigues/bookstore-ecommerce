const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Books = require("../models/book");

module.exports = {
    async find(request, response) {
        try {
            const books = await Books.find();

            response.status(200).json(books);
        } catch (error) {
            response.status(500).json({
                message: "Something went wrong!",
            });

            console.log(error);
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
            response.status(500).json({
                message: "Something went wrong!",
            });

            console.log(error);
        }
    },

    async create(request, response) {
        const {
            title,
            author,
            price,
            isbn,
            pagesNumber,
            description,
            publisher,
            image,
        } = request.body;

        const newBook = new Books({
            title,
            author,
            price,
            isbn,
            pagesNumber,
            description,
            publisher,
            image,
        });

        try {
            await newBook.save();

            response.status(201).json(newBook);
        } catch (error) {
            response.status(500).json({
                message: "Something went wrong!",
            });

            console.log(error);
        }
    },

    async remove(request, response) {
        const { id } = request.params;

        try {
            const book = await Books.findByIdAndRemove(id);

            cloudinary.uploader.destroy(book.image.public_id, (result) => {
                console.log(result);
            })

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
        const {oldImagePublicId, ...newData} = request.body;
        
        try {
            if (oldImagePublicId !== newData.image.public_id) {
                cloudinary.uploader.destroy(oldImagePublicId, (result) => {
                    console.log(result);
                })
            }

            const data = await Books.findById(id);

            const updatedData = Object.assign(data, newData);

            await Books.findByIdAndUpdate(id, updatedData);

            response.json(updatedData);
        } catch (error) {
            response.status(500).json({
                message: "Something went wrong!",
            });

            console.log(error);
        }
    }
};
