import { Router } from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
  updateSubmission,
  updateSubmissionStatus,
  getReviewHistory,
  requestChanges,
  approveSubmission,
} from "../controllers/submitController";

const router = Router();

router.post("/", createSubmission);
router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);
router.delete("/:id", deleteSubmission);
router.put("/:id", updateSubmission);
router.put("/:id/status", updateSubmissionStatus);
router.post("/:id/approve", approveSubmission);
router.post("/:id/request-changes", requestChanges);
router.get("/:id/reviews", getReviewHistory);
export default router;
