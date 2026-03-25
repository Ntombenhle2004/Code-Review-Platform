import { Router } from "express";
import { getNotifications } from "../controllers/notificationController";

const router = Router();

router.get("/users/:id/notifications", getNotifications);

export default router;
