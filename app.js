const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
require("dotenv").config();

const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use("/api/task", taskRoutes);

module.exports = app;
