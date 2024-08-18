const Test = require("../models/Test");
const Question = require("../models/Question");

const createTest = async (req, res) => {
	try {
		const { title, descriptions, questions, isAdmin } = req.body;

		//checking if the user is an admin
		if (!isAdmin || isAdmin === false) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}

		//checking if the title, questions, and descriptions are provided
		if (!title || !questions || questions.length === 0 || !descriptions) {
			return res
				.status(400)
				.json({ message: "Please fill in all fields properly" });
		}

		//Duplicate test check
		const existingTest = await Test.findOne({ title });
		if (existingTest) {
			return res.status(400).json({ message: "Test already exists" });
		}

		//check if the questions are valid
		const validQuestions = await Question.find({ _id: { $in: questions } });

		if (validQuestions.length !== questions.length) {
			return res.status(400).json({ message: "Invalid questions" });
		}
		//creating a new test
		const newTest = new Test({
			title,
			descriptions,
			questions,
		});

		await newTest.save();

		//updating the questions with the test id
		await Question.updateMany(
			{ _id: { $in: questions } },
			{ $push: { testId: newTest._id } }
		);

		return res.status(201).json({
			message: "Test created successfully",
			test: newTest,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Backend error", error: error.message });
	}
};

module.exports = { createTest };
