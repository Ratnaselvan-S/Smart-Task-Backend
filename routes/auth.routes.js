const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

router.post("/signup", authController.SignUp);
router.post("/login", authController.Login);

router.get("/auth/me", jwtMiddleware, (req, res) => {
  return res.status(200).json({
    userId: req.user.userId,
    email: req.user.email,
  });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

module.exports = router;
