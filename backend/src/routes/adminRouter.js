const express = require("express");
const routes = express.Router();

const { get: getUsers, update: updateUser } = require("../controllers/userController");
const { create, remove, update } = require("../controllers/bookController");
const { getAll } = require('../controllers/ordersController')

routes.get('/getUsers', getUsers)
routes.get('/updateUser/:id', updateUser)

routes.post("/create", create);
routes.delete("/:id", remove);
routes.patch("/:id", update);

routes.get('/getOrders', getAll)

module.exports = routes