const express = require("express");
const routes = express.Router();

const { createCheckoutSession } = require("../controllers/paymentController");

routes.post("/create-checkout-session", createCheckoutSession);

module.exports = routes;
