const express = require("express");
const routes = express.Router();

const booksController = require("./controllers/booksController");
const cartController = require("./controllers/cartController");

routes.get("/books", booksController.index);
routes.get("/books/:id", booksController.index);

routes.get("/cart", cartController.index);
routes.post("/cart/new", cartController.create);

module.exports = routes;
