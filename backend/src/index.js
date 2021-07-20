require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser')
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const { ATLAS_ADMIN_PASSWORD } = require("./config")

const app = express();

const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const stripeRouter = require("./routes/stripeRouter");
const ordersRouter = require("./routes/ordersRouter");
const adminRouter = require("./routes/adminRouter");
const uploadFileRouter = require("./routes/uploadFileRouter");

const { verifyToken, isAdmin } = require('./middlewares/auth')
const { refreshToken, getAccessToken } = require("./controllers/tokenController")

app.use(logger("common"));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

// Disable server info
app.disable("x-powered-by");

app.use("/books", bookRouter);
app.use("/user", userRouter);
app.use("/stripe", verifyToken, stripeRouter);
app.use("/orders", verifyToken, ordersRouter);
app.use('/admin', verifyToken, isAdmin, adminRouter)

app.use("/upload", uploadFileRouter);

app.post('/refreshToken', refreshToken)
app.get('/getAccessToken', getAccessToken)

const connection_url = `mongodb+srv://admin:${ATLAS_ADMIN_PASSWORD}@cluster0.yxb3f.mongodb.net/bookstore?retryWrites=true&w=majority`;
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
