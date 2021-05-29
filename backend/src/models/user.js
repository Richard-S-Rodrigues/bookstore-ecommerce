const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please, add an email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please, add a valid email",
        ],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please, add a name"],
    },
    password: {
        type: String,
        minlength: [6, "Password should be 6 character long"],
        required: [true, "Please, add a password"],
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", UserSchema);
