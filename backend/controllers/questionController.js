const Question = require("../models/Question");
const Test = require("../models/Test");

// Create a new question
const createQuestion = async (req, res) => {
	try {
		// Check if user is admin
		const { question, options, correctOption, marks, isAdmin } = req.body;
		if (!isAdmin) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}

		// Check if all fields are provided
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
		return res.status(500).json({
			message: "Problem creating question",
			error: error.message,
		});
	}
};

// Get all questions
const getQuestions = async (req, res) => {
	try {
		const questions = await Question.find();
		return res.status(200).json({ message: "All questions", questions });
	} catch (error) {
		return res.status(500).json({
			message: "Problem fetching questions",
			error: error.message,
		});
	}
};

const getQuestionById = async (req, res) => {
	try {
		const { id } = req.params;
		const question = await Question.findById(id);
		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}

		return res.status(200).json({ message: "Question", question });
	} catch (error) {
		return res.status(500).json({
			message: "Problem fetching question",
			error: error.message,
		});
	}
};

//Update question
const updateQuestion = async (req, res) => {
	try {
		// Get question id from params
		const { id } = req.params;
		// Get question details from body
		const { question, options, correctOption, marks, isAdmin } = req.body;

		// Check if user is admin
		if (!isAdmin || isAdmin === false) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}

		// Check if all fields are provided
		const existingQuestion = await Question.findById(id);
		if (!existingQuestion) {
			return res.status(404).json({ message: "Question not found" });
		}

		// Update question -- if not provided, use the existing question details
		existingQuestion.question = question || existingQuestion.question;
		existingQuestion.options = options || existingQuestion.options;
		existingQuestion.correctOption =
			correctOption || existingQuestion.correctOption;
		existingQuestion.marks = marks || existingQuestion.marks;
		existingQuestion.updatedAt = Date.now();

		// Save updated question
		const updatedQuestion = await existingQuestion.save();

		return res.status(200).json({
			message: "Question updated successfully",
			question: updatedQuestion,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Problem updating question",
			error: error.message,
		});
	}
};

//Delete question
const deleteQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const { isAdmin } = req.body;

		if (!isAdmin || isAdmin === false) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}

		// Check if question exists
		const question = await Question.findByIdAndDelete(id);
		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}

		//delete the questionId from all tests

		await Test.updateMany({ questions: id }, { $pull: { questions: id } });

		return res.status(200).json({ message: "Question deleted successfully" });
	} catch (error) {
		return res.status(500).json({
			message: "Problem deleting question",
			error: error.message,
		});
	}
};

module.exports = {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
};
