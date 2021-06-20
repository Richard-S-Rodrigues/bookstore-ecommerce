const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    userEmail: {
        type: String,
        required: [true, "Please, add an email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please, add a valid email",
        ],
        unique: true,
    },
    orderList: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Orders", OrdersSchema);
