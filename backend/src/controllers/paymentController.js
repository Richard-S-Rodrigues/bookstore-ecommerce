const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
    async createCheckoutSession(req, res) {
        const { line_items } = req.body

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/',
            });

            res.json({ id: session.id });

        } catch(error) {
            res.status(error.statusCode || 500).json({message: error})
            console.log(error)
        }
    }

};
