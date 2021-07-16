const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokensSchema = new Schema({
    userId: { type: String, required: true },
    expiryDate: {type: Date, required: true }
});

module.exports = mongoose.model("tokens", tokensSchema);
