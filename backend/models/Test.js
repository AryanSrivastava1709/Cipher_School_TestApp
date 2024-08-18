const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	descriptions: {
		type: String,
	},
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
		},
	],
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

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
