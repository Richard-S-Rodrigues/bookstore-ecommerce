const jwt = require("jsonwebtoken");

const User = require('../models/user')
const Token = require('../models/tokens')

const { JWT_ACCESS_SECRET } = require("../config")

module.exports = { 
    verifyToken(req, res, next) {
        const accessToken = req.cookies.jwt

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized request!",
            });
        }

        jwt.verify(accessToken, JWT_ACCESS_SECRET, (err, user) => {

            if (err) {
                console.log(err)
                return res.status(401).json({ message: "Unauthorized request!" });
            }

            if (!user) {
                return res.status(404).json({ message: "User not found!" });   
            }
            
            req.user = user;

            next();
        });
    },

    isAdmin(req, res, next) {
        const { id } = req.user

        try {

            if (!id) {
                throw new Error("Id not provided!");
            }

            if (!User) {
                return res.status(404).json({ message: "User not found in database!" })
            }

            User.findById(id).exec((err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: err });
                }
                
                if (!user) {
                    return res.status(404).json({ message: "User not found!" })
                }

                if (user.role === 'admin') {
                    next()
                    return;
                }

                return res.status(403).send({ message: "Require Admin Role!" });

            })

        } catch(error) {
            res.status(error.statusCode || 500).json({message: error})
            console.log(error)
        }
    }
};
