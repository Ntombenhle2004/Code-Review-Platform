import express from "express";
import {
  createComment,
  listComments,
  editComment,
  removeComment,
} from "../controllers/commentControllers";

const router = express.Router();

// Comments on submissions
router.post("/submissions/:id/comments", createComment);
router.get("/submissions/:id/comments", listComments);
router.put("/comments/:id", editComment);
router.delete("/comments/:id", removeComment);

export default router;
