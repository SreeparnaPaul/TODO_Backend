const express = require("express");
const {
  login,
  logout,
} = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();


router.post("/login", login);
router.post("/logout",authenticateJWT, logout);


module.exports = router;