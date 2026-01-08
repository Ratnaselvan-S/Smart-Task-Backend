const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/jwt.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", taskController.createTask);
router.get("/", taskController.getTask);
router.put("/:taskId", taskController.UpdateTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
