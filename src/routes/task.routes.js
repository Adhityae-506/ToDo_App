import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createTask,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask,
  getStats,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);
router.get("/stats", getStats);

export default router;
