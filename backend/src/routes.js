const express = require("express");
const passport = require("passport");
const routes = express.Router();

const booksController = require("./controllers/booksController");
const userController = require("./controllers/userController");

routes.get("/books", booksController.find);
routes.get("/books/:id", booksController.findOne);
routes.post("/books", booksController.create);
routes.delete("/books/:id", booksController.delete);
routes.patch("/books/:id", booksController.update);

routes.post("/signup", userController.signup);
routes.post(
    "/login",
    passport.authenticate("local", { failuredRedirect: "/login" }),
    userController.login
);
routes.get("/login", userController.index);
routes.get("/logout", userController.logout);

module.exports = routes;
