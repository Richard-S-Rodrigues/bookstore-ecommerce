const jwt = require("jsonwebtoken")
const Token = require("../models/tokens")
const User = require("../models/user")

const {  
	JWT_ACCESS_SECRET, 
	ACCESS_TOKEN_LIFE 
} = require("../config")

const tokenController = {

	async refreshToken(req, res) {
		const requestRefreshToken = req.body.token

		try {
			const isTokenInDatabase = await Token.findById(requestRefreshToken)

			if (!requestRefreshToken || isTokenInDatabase === null) {
				return res.status(401).json({
					message: "Unauthorized request!",
				});
			}

			if (verifyTokenExpiration(isTokenInDatabase)) {
				await Token.findByIdAndRemove(isTokenInDatabase._id, { useFindAndModify: false }).exec();

				return res.status(403).json({
					message: "Refresh token expired. Make a new sign in request"
				})
			}

			const user = await User.findOne({ _id: isTokenInDatabase.userId })
			
			const newAccessToken = jwt.sign(
				{
					email: user.email, 
					id: user._id
				}, 
				JWT_ACCESS_SECRET, 
				{
					expiresIn: ACCESS_TOKEN_LIFE
				}
			)

		    // SET SECURE TO TRUE IN PRODUCTION
		    res.cookie('jwt', newAccessToken, { httpOnly: true })

		    res.status(201).json({ accessToken: newAccessToken })	
		} catch(err) {
			console.log("error: ", err)
			return res.status(500).json({ message: "Internal server error!" });
		}
	},

	getAccessToken(req, res) {
		const accessToken = req.cookies.jwt;

		if (!accessToken) {
			console.log(`Access token: ${accessToken}`)
			return res.status(404).json({
				message: "Access Token not found"
			})
		}

		return res.json(accessToken);
	}

}

function verifyTokenExpiration(token) {
	return token.expiryDate.getTime() < new Date().getTime();
}

module.exports = tokenController;
