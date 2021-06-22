const mongoose = require("mongoose");
const { Schema } = mongoose;

const booksSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    isbn: { type: String, required: true },
    pagesNumber: { type: String, required: true },
    description: { type: String },
    publisher: { type: String, required: true },
    image: { type: String },
    ordered_quantity: { type: String, default: "0" },
});

module.exports = mongoose.model("books", booksSchema);
