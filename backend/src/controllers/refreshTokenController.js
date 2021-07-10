const jwt = require("jsonwebtoken")
const Token = require("../models/tokens")

const refreshTokenController = async (req, res) => {
	const refreshToken = req.body.token
	const isTokenInDatabase = await Token.findOne({ jwtToken: refreshToken })

	if (!refreshToken || isTokenInDatabase === null) {
		return res.status(401).json({
			message: "Unauthorized request!",
		});
	}

	try {
		const tokenPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		
		const newAccessToken = jwt.sign(
			{
				email: tokenPayload.email, 
				id: tokenPayload.id
			}, 
			process.env.JWT_ACCESS_SECRET, 
			{
				expiresIn: process.env.ACCESS_TOKEN_LIFE
			}
		)

	    // SET SECURE TO TRUE IN PRODUCTION
	    res.cookie('jwt', newAccessToken, { httpOnly: true })

	    res.json({ accessToken: newAccessToken })	
	} catch(err) {
		console.log("error: ", err)
		return res.status(403).json({ message: err.message || "Request forbidden!" });
	}

}

module.exports = refreshTokenController
