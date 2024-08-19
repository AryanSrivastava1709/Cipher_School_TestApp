const Submission = require("../models/Submissions");
const Test = require("../models/Test");
const User = require("../models/User");
const sendEmail = require("../utils/emailSender");

const evaluateAll = async () => {
	try {
		// Find submissions that are not evaluated yet
		const submissions = await Submission.find({
			endedAt: { $ne: null },
			isDeleted: false,
		})
			.populate("testId")
			.populate("userId"); // Ensure test and user details are populated

		// Evaluate all the submissions
		for (const submission of submissions) {
			// Skip if the submission is already evaluated
			if (submission.isEvaluated) {
				console.log(
					`Skipping already evaluated submission for user: ${submission.userId.email}`
				);
				continue;
			}

			const test = await Test.findById(submission.testId).populate("questions");
			const user = await User.findById(submission.userId);

			let score = 0;
			for (const selection of submission.selections) {
				const question = test.questions.find((q) =>
					q._id.equals(selection.questionId)
				);
				if (question && question.correctOption === selection.option) {
					score += question.marks;
				}
			}

			console.log(`Score: ${score}`);
			// Update the score and evaluation status of the submission
			submission.score = score;
			submission.isEvaluated = true;
			await submission.save();

			// Send email to the user
			console.log(`Submission evaluated for user: ${user.email}`);
			await sendEmail(user.email, user.name, test.title, score);
		}
	} catch (error) {
		console.error({ message: "Error in evaluation", error: error.message });
	}
};

module.exports = { evaluateAll };
