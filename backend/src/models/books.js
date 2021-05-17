const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const booksSchema = new Schema({
    title: String,
    author: String,
    price: String,
    isbn: String,
    publisher: String,
    image: String,
});

booksSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("books", booksSchema);
