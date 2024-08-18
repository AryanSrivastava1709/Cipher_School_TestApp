const User = require("../models/User");
const bcrypt = require("bcryptjs");
const signJwt = require("../utils/signJwt");
const register = async (req, res) => {
	try {
		//extracting email, username, and password from the request body
		const { email, name, password, isAdmin } = req.body;
		if (!email || !name || !password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}
		//checking if the password is at least 8 characters long
		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: "Password must be at least 8 characters" });
		}
		//checking if the user already exists
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}
		//hashing the password
		const hashedPassword = await bcrypt.hash(password, 12);

		//creating a new user
		const newUser = new User({
			email,
			name,
			password: hashedPassword,
			isAdmin: isAdmin,
		});

		//saving the user to the database
		await newUser.save();

		//sending a success message
		res.status(201).json({
			message: "User registered successfully",
			user: {
				email: newUser.email,
				name: newUser.name,
				isAdmin: newUser.isAdmin,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Backend error", error: error.message });
	}
};

const login = async (req, res) => {
	try {
		//extracting email and password from the request body
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}

		//checking if the user exists
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(400).json({ message: "Please register yourself" });
		}

		//checking if the password is correct
		const isMatch = await bcrypt.compare(password, user.password);

		//if the password is incorrect
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		//creating a JWT token
		const token = signJwt(user);

		res.status(200).json({
			message: "Logged in successfully",
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
			},
			token,
		});
	} catch (error) {
		res.status(500).json({ message: "Backend error", error: error.message });
	}
};

const logout = async (req, res) => {
	try {
		res.cookie("token", "logout", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			expires: new Date(0), // immediately expires the cookie
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ message: "Backend error", error: error.message });
	}
};

module.exports = { register, login, logout };
