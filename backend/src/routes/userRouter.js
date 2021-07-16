const express = require("express");
const routes = express.Router();

const { signin, signup, signout, getUser } = require("../controllers/userController");

routes.post("/signin", signin);
routes.post("/signup", signup);
routes.post("/signout", signout);

routes.post("/get", getUser)

module.exports = routes;
