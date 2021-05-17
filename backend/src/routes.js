const express = require("express");
const passport = require("passport");
const routes = express.Router();

const booksController = require("./controllers/booksController");
const cartController = require("./controllers/cartController");
const userController = require("./controllers/userController");

routes.get("/books", booksController.get);
routes.get("/books/:id", booksController.get);
routes.post("/books", booksController.create);
routes.delete("/books/:id", booksController.delete);

routes.get("/cart", cartController.index);
routes.post("/cart/new", cartController.create);

routes.post("/signup", userController.signup);
routes.post(
    "/login",
    passport.authenticate("local", { failuredRedirect: "/login" }),
    userController.login
);
routes.get("/login", userController.index);
routes.get("/logout", userController.logout);

module.exports = routes;
