const express = require("express");
const routes = express.Router();

const { find, findOne } = require("../controllers/bookController");

routes.get("/", find);
routes.get("/:id", findOne);

module.exports = routes;
