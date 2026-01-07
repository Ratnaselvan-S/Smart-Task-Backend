const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use(authRoutes);

module.exports = app;
