require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

const routes = require("./routes");

app.use(logger("common"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.disable("x-powered-by");

app.use(routes);

const User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const connection_url = `mongodb+srv://admin:${process.env.ATLAS_ADMIN_PASSWORD}@cluster0.yxb3f.mongodb.net/bookstore?retryWrites=true&w=majority`;
const port = process.env.PORT || 3001;

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
