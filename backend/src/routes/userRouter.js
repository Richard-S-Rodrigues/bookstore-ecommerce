const express = require("express");
const routes = express.Router();

const { signin, signup } = require("../controllers/userController");

routes.post("/signin", signin);
routes.post("/signup", signup);

module.exports = routes;
