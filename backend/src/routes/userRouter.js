const express = require("express");
const routes = express.Router();

const { signin, signup, getUser } = require("../controllers/userController");

const auth = require("../middlewares/auth");

routes.post("/signin", signin);
routes.post("/signup", signup);
routes.post("/", getUser);

module.exports = routes;
