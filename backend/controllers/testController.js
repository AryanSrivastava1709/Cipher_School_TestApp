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
			.json({ message: "Problem creating test", error: error.message });
	}
};

// get all tests
const getTest = async (req, res) => {
	try {
		const tests = await Test.find({ isDeleted: false });
		return res.status(200).json({ message: "All tests", tests });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Backend error", error: error.message });
	}
};

// get Test by id
const getTestById = async (req, res) => {
	const { id } = req.params;

	try {
		const test = await Test.findById(id).populate("questions");
		if (!test || test.isDeleted) {
			return res.status(404).json({ message: "Test not found" });
		}
		return res.status(200).json({ message: "Test", test });
	} catch (error) {
		return res.status(500).json({
			message: "Failed to fetch the details of the test",
			error: error.message,
		});
	}
};

//updating the questions with the test id
const updateTest = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, descriptions, questions, isAdmin } = req.body;

		// Check if the user is an admin
		if (!isAdmin || isAdmin === false) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}

		// Find the test by ID and check if it exists and isn't deleted
		const test = await Test.findById(id);
		if (!test || test.isDeleted) {
			return res.status(404).json({ message: "Test not found" });
		}

		if (questions && questions.length > 0) {
			const validQuestions = await Question.find({ _id: { $in: questions } });

			if (validQuestions.length !== questions.length) {
				return res.status(400).json({ message: "Invalid questions" });
			}

			// Remove testId from questions that are not in the new array
			await Question.updateMany(
				{ _id: { $nin: questions }, testId: id },
				{ $pull: { testId: id } }
			);

			// Update the testId field in the new set of questions
			await Question.updateMany(
				{ _id: { $in: questions } },
				{ $push: { testId: id } }
			);
		} else {
			// If no questions are provided, remove testId from all current questions
			await Question.updateMany({ testId: id }, { $pull: { testId: id } });
		}

		// Update the test with new questions, title, and descriptions
		test.title = title || test.title;
		test.descriptions = descriptions || test.descriptions;
		test.questions = questions || [];
		test.updatedAt = Date.now();

		// Save the updated test
		const updatedTest = await test.save();

		return res.status(200).json({
			message: "Test updated successfully",
			test: updatedTest,
		});
	} catch (error) {
		return res.status(500).json({
			message: "There was an error updating the test",
			error: error.message,
		});
	}
};

//delete test
const deleteTest = async (req, res) => {
	try {
		const { id } = req.params;
		const { isAdmin } = req.body;

		if (!isAdmin || isAdmin === false) {
			return res
				.status(403)
				.json({ message: "You are not authorized to perform this action" });
		}
		const test = await Test.findById(id);
		const { isDeleted } = test;
		if (!test || isDeleted) {
			return res.status(404).json({ message: "Test not found" });
		}
		test.isDeleted = true;
		await test.save();
		return res.status(200).json({ message: "Test deleted successfully" });
	} catch (error) {
		return res.status(500).json({
			message: "There was an error deleting the test",
			error: error.message,
		});
	}
};

module.exports = { createTest, getTest, getTestById, updateTest, deleteTest };
