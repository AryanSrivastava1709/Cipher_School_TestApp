const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectToDB = require("./utils/connectToDb");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const questionRoutes = require("./routes/questionRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const JSONErrorHandler = require("./utils/JSONErrorHandler");

const app = express();

// Not used dotnev instead used Nodejs 20 latest feature that is you can directly use process.env by specifying .env file

//Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(helmet()); // For security headers

//Cors
app.use(
	cors({
		origins: true,
		credentials: true,
	})
);

//connect to database
try {
	connectToDB();
} catch (err) {
	console.error("Error connecting to MongoDB", err);
	process.exit(1);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/submission", submissionRoutes);

// Error handler middleware
app.use(JSONErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
