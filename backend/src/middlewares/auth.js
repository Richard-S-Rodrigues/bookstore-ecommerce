const jwt = require("jsonwebtoken");

const User = require('../models/user')
const Token = require('../models/tokens')

module.exports = { 
    verifyToken(req, res, next) {
        const accessToken = req.cookies.jwt

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized request!",
            });
        }

        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {

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
