const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const testController = require("../controllers/testController");
router.use(authMiddleware);

// create a new test
router.post("/", testController.createTest);

// get all tests
router.get("/", testController.getTest);

// get a single test
router.get("/:id", testController.getTestById);

// update a test
router.put("/:id", testController.updateTest);

// delete a test
router.delete("/:id", testController.deleteTest);

module.exports = router;
