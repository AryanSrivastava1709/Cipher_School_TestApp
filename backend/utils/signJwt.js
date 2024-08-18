const jwt = require("jsonwebtoken");

const signJWT = (payload) => {
	return jwt.sign(
		{
			id: payload._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

module.exports = signJWT;
