import { Router } from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
} from "../controllers/submitController";

const router = Router();

router.post("/", createSubmission);
router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);
router.delete("/:id", deleteSubmission);

export default router;
