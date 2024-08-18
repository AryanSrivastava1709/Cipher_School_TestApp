const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const testController = require("../controllers/testController");
router.use(authMiddleware);

// create a new test
router.post("/", testController.createTest);

module.exports = router;
