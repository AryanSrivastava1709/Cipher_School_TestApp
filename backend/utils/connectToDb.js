const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB", err);
		process.exit(1);
	}
};

module.exports = connectToDB;
