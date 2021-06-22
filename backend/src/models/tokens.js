const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokensSchema = new Schema({
    userId: { type: String, required: true },
    jwtToken: { type: String, required: true }
});

module.exports = mongoose.model("tokens", tokensSchema);
