const express = require("express");
const {
  login,
  logout,
  logoutFromAllDevices
} = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();


router.post("/login", login);
router.post("/logout",authenticateJWT, logout);
router.get("/logoutFomAllDevices",authenticateJWT, logoutFromAllDevices);


module.exports = router;