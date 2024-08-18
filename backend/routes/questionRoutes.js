const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

router.post("/", questionController.createQuestion);

module.exports = router;
