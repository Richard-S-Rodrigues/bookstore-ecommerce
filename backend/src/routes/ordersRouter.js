const express = require("express");
const routes = express.Router();

const { create, get } = require('../controllers/ordersController')

routes.post('/create', create)
routes.post('/get', get)

module.exports = routes