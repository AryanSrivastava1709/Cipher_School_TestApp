const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Register a new user
router.post("/register", AuthController.register);

// Login a user
router.post("/login", AuthController.login);

//logout a user
router.get("/logout", AuthController.logout);

module.exports = router;
