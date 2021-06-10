const express = require("express");
const routes = express.Router();

const { createOrder } = require("../controllers/paymentController");

routes.post("/create-order", createOrder);

module.exports = routes;
