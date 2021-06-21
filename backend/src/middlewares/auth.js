const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const User = require('../models/user')

module.exports = { 
    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                message: "Unauthorized request!",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ message: err.message || "Request forbidden!" });
            }

            req.user = user;

            next();
        });
    },

    isAdmin(req, res, next) {
        const { id } = req.user

        try {
            User.findById(id).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                
                if (user.role === 'admin') {
                    next()
                    return;
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            })

        } catch(error) {
            res.status(500).send({message: error})
            console.log(error)
        }
    }
};
