const express = require("express");
const router = express.Router();

const { login, register } = require("../../../Sahay-microvolunteering_app/controllers/authController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
