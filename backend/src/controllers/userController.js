const User = require("../models/user");

module.exports = {
    // Login with GET request
    index(request, response) {
        const { user } = request;

        if (!user) {
            return response.status(400).json({
                error: "User not found",
            });
        }

        response.status(200).json({
            user,
        });
    },

    async signup(request, response, next) {
        const { email, username, password } = request.body;

        const newUser = new User({ email, username, password });

        try {
            await newUser.save();

            response.status(201).json(newUser);
        } catch (error) {
            response.status(400).json({
                message: error.message,
            });
        }
    },
    // Login with POST request
    login(request, response, next) {
        request.session.save((err) => {
            if (err) {
                return next(err);
            }

            response.redirect("/");
        });
    },

    logout(request, response, next) {
        request.logout();
        request.session.save((err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/");
        });
    },
};
