const express = require("express");
const routes = express.Router();

const { get: getUsers, update: updateUser } = require("../controllers/userController");
const { create, remove, update } = require("../controllers/bookController");

routes.get('/getUsers', getUsers)
routes.get('/updateUser/:id', updateUser)

routes.post("/create", create);
routes.delete("/:id", remove);
routes.patch("/:id", update);

module.exports = routes