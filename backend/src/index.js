require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const stripeRouter = require("./routes/stripeRouter");
const ordersRouter = require("./routes/ordersRouter");

app.use(logger("common"));
app.use(cors());
app.use(express.json());

app.disable("x-powered-by");

app.use("/books", bookRouter);
app.use("/user", userRouter);
app.use("/stripe", stripeRouter);
app.use("/orders", ordersRouter);

const connection_url = `mongodb+srv://admin:${process.env.ATLAS_ADMIN_PASSWORD}@cluster0.yxb3f.mongodb.net/bookstore?retryWrites=true&w=majority`;
const port = process.env.PORT || 3333;

mongoose
    .connect(connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
