import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
  removeMember,
  addMember,
} from "../controllers/projectControllers";
import { getSubmissionsByProject } from "../controllers/submitController";
import { getProjectStats } from "../controllers/analyticsControllers";

const router = Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.post("/:id/members", addMember);
router.delete("/:id/members/:userId", removeMember);
router.get("/:id/submissions", getSubmissionsByProject);
router.get("/:id/stats", getProjectStats);

export default router;
