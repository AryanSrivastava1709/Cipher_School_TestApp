// Error handler middeleware to handle wrong JSON format

const JSONErrorHandler = (err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return res.status(400).json({ message: "Invalid JSON format" });
	}
	next();
};

module.exports = JSONErrorHandler;
