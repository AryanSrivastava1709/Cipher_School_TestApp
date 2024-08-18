const Question = require("../models/Question");

const createQuestion = async (req, res) => {
	try {
		const { question, options, correctOption, marks, isAdmin } = req.body;
		if (!isAdmin) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}
		if (!question || !options || !correctOption || !marks) {
			return res.status(400).json({ message: "All fields are required" });
		}

		//Duplicate question check
		const existingQuestion = await Question.findOne({ question });
		if (existingQuestion) {
			return res.status(400).json({ message: "Question already exists" });
		}

		// Create a new question
		const newQuestion = new Question({
			question,
			options,
			correctOption,
			marks,
		});

		await newQuestion.save();
		return res.status(201).json({
			message: "Question created successfully",
			question: newQuestion,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { createQuestion };
