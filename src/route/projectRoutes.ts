import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
} from "../controllers/projectControllers";

const router = Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);

export default router;
