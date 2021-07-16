const { STRIPE_SECRET_KEY } = require("../config")
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const payment = {
    async createCheckoutSession(req, res) {
        const { lineItems, customerId } = req.body

        try {
            const session = 
                !customerId ? 
                    await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: lineItems,
                        mode: 'payment',
                        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
                        cancel_url: 'http://localhost:3000/cancel',
                    })
                :
                    await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: lineItems,
                        customer: customerId,
                        mode: 'payment',
                        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
                        cancel_url: 'http://localhost:3000/cancel',
                    });

            res.json({ id: session.id });

        } catch(error) {
            res.status(error.statusCode || 500).json({ message: "Internal server error" })
            console.log(error)
        }
    },

    async successOrder(req, res) {
        try {
            const session = await stripe.checkout.sessions.retrieve(req.body.session_id)
            const customer = await stripe.customers.retrieve(session.customer)
            
            res.json({ customer })

        } catch(error) {
            res.status(error.statusCode || 500).json({ message: "Internal server error" })
            console.log(error)
        }
    }
};

const customer = {
    async create(req, res) {
        const { email, name } = req.body

        try {
            const newCustomer = await stripe.customers.create({
                email,
                name
            })
            res.json({ customer: newCustomer })

        } catch(error) {
            res.status(error.statusCode || 500).json({ message: "Internal server error" })
            console.log(error)
        }
    },

    async getByEmail(req, res) {
        const { email } = req.body

        try {
            const { data: customer } = await stripe.customers.list({
                email,
                limit: 1
            });

            res.json({ customerId: !customer[0] ? undefined : customer[0].id })

        } catch(error) {
            res.status(error.statusCode || 500).json({ message: "Internal server error" })
            console.log(error)
        }
    }
}

module.exports = { payment, customer }