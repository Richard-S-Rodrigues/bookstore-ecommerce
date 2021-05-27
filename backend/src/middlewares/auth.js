const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            message: "Unauthorized request!",
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Request forbidden!" });
        }

        req.user = user;

        next();
    });
};
