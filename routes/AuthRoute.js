const express = require("express")
const AuthController = require("../controller/AuthController")
const router = express.Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)

module.exports = router