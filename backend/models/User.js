const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
		min: 8,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
