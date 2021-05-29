const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const User = require("../models/user");

const secret = process.env.JWT_SECRET;

module.exports = {
    async signup(req, res) {
        const { email, password, username } = req.body;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res
                    .status(400)
                    .json({ message: "User already exists!" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                email,
                password: hashedPassword,
                username,
            });

            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });

            console.log(error);
        }
    },

    async signin(req, res) {
        const { email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });

            if (!userExists) {
                return res.status(404).json({ message: "User not found!" });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                userExists.password
            );

            if (!isPasswordCorrect) {
                return res
                    .status(400)
                    .json({ message: "Invalid credentials!" });
            }

            const token = jwt.sign(
                { email: userExists.email, id: userExists._id },
                secret,
                { expiresIn: "1h" }
            );

            res.status(200).json({ user: userExists, token });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });

            console.log(error);
        }
    },
};
