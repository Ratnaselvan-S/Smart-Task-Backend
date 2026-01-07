const User = require("../models/user.models");

async function SignUp(req, res) {
  try {
    const { email, name, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const user = new User({ email, name, password });
    await user.hashPassword();

    await user.save();

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("sign up Error: ", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

module.exports = { SignUp };
