const express = require("express");

const app = express();

// Not used dotnev instead used Nodejs 20 latest feature that is you can directly use process.env by specifying .env file

//Middleware
app.use(express.json());

// Routes - For testing
app.get("/", (req, res) => {
	res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
