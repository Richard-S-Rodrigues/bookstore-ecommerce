const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/*Data
line_items: [{
    price_data: {
        currency,
        product_data: {
            name: 'name of the product',
            
        },
        unit_amount_decimal
    },
    adjustable_quantity: {
        enabled: false
    }
    quantity,
    tax_rates
}]*/

module.exports = {
    async createSession(req, res) {
        const {
            client_reference_id,
            customer_email,

            line_items,
        } = req.body;

        const session = await stripe.checkout.sessions.create({
            client_reference_id,
            customer_email,
            line_items,
            payment_method_types: ["card"],
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
            mode: "payment",
            locale: "auto",
            shipping_address_collection: {
                allowed_countries: ["BR", "US", "CA"],
            },
        });

        res.json(session);
    },

    async createOrder(req, res) {
        const { customer, email, shipping, items } = req.body;

        const order = await stripe.orders.create({
            currency: "usd",
            customer,
            email,
            shipping,
            items,
        });
        res.json(order);
    },
};
