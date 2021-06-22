const jwt = require("jsonwebtoken");

const access_secret = process.env.JWT_ACCESS_SECRET;
const refresh_secret = process.env.JWT_REFRESH_SECRET;

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

        jwt.verify(accessToken, access_secret, (err, user) => {
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
    },

    async refreshToken(req, res) {
        const accessToken = req.cookies.jwt

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized request!",
            });
        }

        let payload;
        try {
            payload = jwt.verify(accessToken, access_secret)
        
        } catch(error) {
            console.log(err)
            return res.status(403).json({ message: err.message || "Request forbidden!" });
        }

        const { jwtToken } = await Token.findById(payload.id)

        try {
            jwt.verify(jwtToken, refresh_secret)

        } catch(error) {
            console.log(err)
            return res.status(403).json({ message: err.message || "Request forbidden!" });   
        }

        const newAccessToken = jwt.sign(payload, access_secret, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        // SET SECURE TO TRUE IN PRODUCTION
        res.cookie('jwt', newAccessToken, { httpOnly: true })

        res.send()
    },
};
