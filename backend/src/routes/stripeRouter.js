const express = require("express");
const routes = express.Router();

const { payment, customer } = require("../controllers/stripeController");

routes.post("/create-checkout-session", payment.createCheckoutSession);
routes.post('/order-success', payment.successOrder)

routes.post('/createCustomer', customer.create)
routes.post('/getCustomer', customer.getByEmail)

module.exports = routes;
