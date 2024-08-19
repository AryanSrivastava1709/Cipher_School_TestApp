const Submission = require("../models/Submissions");
const Test = require("../models/Test");
const User = require("../models/User");
const Question = require("../models/Question");

//create a submission
const submitTest = async (req, res) => {
	try {
		const { testId, selections, userId } = req.body;

		//checking if the testId, selections, and userId are provided
		if (!testId || !selections || selections.length === 0 || !userId) {
			return res
				.status(400)
				.json({ message: "All fields are not provided to submit the test" });
		}

		//validate test and user
		const test = await Test.findById(testId);
		if (!test) {
			return res.status(400).json({ message: "Invalid test" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "Invalid user" });
		}

		//check if the test is already submitted
		const existingSubmission = await Submission.findOne({ testId, userId });
		if (existingSubmission) {
			return res.status(400).json({ message: "Test already submitted" });
		}

		// check if selections are valid
		for (let selection of selections) {
			const question = await Question.findById(selection.questionId);
			if (!question) {
				return res.status(400).json({ message: "Invalid question" });
			}
		}

		//creating a new submission
		const newSubmission = new Submission({
			testId,
			userId,
			selections,
			endedAt: Date.now(),
		});

		await newSubmission.save();

		return res.status(201).json({
			message: "Test submitted successfully",
			submission: newSubmission,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Problem submitting test", error: error.message });
	}
};

//get all submissions
const getSubmissions = async (req, res) => {
	try {
		const submission = await Submission.find({ isDeleted: false });
		if (!submission) {
			return res.status(400).json({ message: "No submission found" });
		}
		return res.status(200).json({ message: "All submissions", submission });
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching all the submission",
			error: error.message,
		});
	}
};

//get all submissions by testId
const getSubmissionsByTestId = async (req, res) => {
	try {
		const { testId } = req.params;
		const test = await Test.findById(testId);
		if (!test) {
			return res.status(400).json({ message: "Invalid test" });
		}

		const submissions = await Submission.find({ testId, isDeleted: false });
		if (!submissions) {
			return res.status(400).json({ message: "No submission found" });
		}

		return res.status(200).json({ message: "All submissions", submissions });
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching all the submission for this test",
			error: error.message,
		});
	}
};

//get all submissions by userId
const getSubmissionsByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "Invalid test" });
		}

		const submissions = await Submission.find({ userId, isDeleted: false });
		if (!submissions) {
			return res.status(400).json({ message: "No submission found" });
		}

		return res.status(200).json({ message: "All submissions", submissions });
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching all the submission for this test",
			error: error.message,
		});
	}
};

//get by userid and testid
const getSubmissionByUserIdAndTestId = async (req, res) => {
	const { userId, testId } = req.query;
	try {
		if (!userId || !testId) {
			return res
				.status(400)
				.json({ message: "userId and testId are required" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "Invalid user" });
		}

		const test = await Test.findById(testId);
		if (!test) {
			return res.status(400).json({ message: "Invalid test" });
		}

		const submission = await Submission.findOne({ userId, testId });
		if (!submission || submission.isDeleted) {
			return res.status(400).json({ message: "No submission found" });
		}
		return res.status(200).json({ message: "Submission found", submission });
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching submission",
			error: error.message,
		});
	}
};

module.exports = {
	submitTest,
	getSubmissions,
	getSubmissionsByTestId,
	getSubmissionsByUserId,
	getSubmissionByUserIdAndTestId,
};
