const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

// Create a new question
router.post("/", questionController.createQuestion);

// Get all questions
router.get("/", questionController.getQuestions);

// Get question by id
router.get("/:id", questionController.getQuestionById);

// Update question
router.put("/:id", questionController.updateQuestion);

// Delete question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
