const express = require("express");
const routes = express.Router();

const { signin, signup, signout } = require("../controllers/userController");

routes.post("/signin", signin);
routes.post("/signup", signup);
routes.post("/signout", signout);

module.exports = routes;
