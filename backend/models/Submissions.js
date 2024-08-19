const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Test",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	selections: [
		{
			questionId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Question",
				required: true,
			},
			option: {
				type: String,
			},
			savedAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
	isEvaluated: {
		type: Boolean,
		default: false,
	},
	endedAt: {
		type: Date,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
