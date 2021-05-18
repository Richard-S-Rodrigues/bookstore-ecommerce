const mongoose = require("mongoose");
const { Schema } = mongoose;

const booksSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    image: { type: String },
});

module.exports = mongoose.model("books", booksSchema);