const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [
		{
			type: String,
			required: true,
		},
	],
	correctOption: {
		type: String,
		required: true,
	},
	marks: {
		type: Number,
		required: true,
	},
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Test",
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

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
