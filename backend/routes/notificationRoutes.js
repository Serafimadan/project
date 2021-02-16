import express from "express";
const router = express.Router();
import {
  getNotification,
  deleteNotification,
  markAsRead,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getNotification);
router.route("/:id").put(protect, deleteNotification);
router.route("/read/:id").put(protect, markAsRead);

export default router;
