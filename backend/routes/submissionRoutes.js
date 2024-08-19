const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const submissionController = require("../controllers/submissionController");
router.use(authMiddleware);

//create a submission
router.post("/", submissionController.submitTest);

router.get("/", (req, res, next) => {
	if (req.query.userId && req.query.testId) {
		//get submission by userId and testId
		submissionController.getSubmissionByUserIdAndTestId(req, res, next);
	} else {
		//get all submissions
		submissionController.getSubmissions(req, res, next);
	}
});

//get all submissions by testId
router.get("/test/:testId", submissionController.getSubmissionsByTestId);

//get all submissions by userId
router.get("/user/:userId", submissionController.getSubmissionsByUserId);

module.exports = router;
