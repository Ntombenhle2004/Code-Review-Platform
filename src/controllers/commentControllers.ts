import { Request, Response } from "express";
import {
  addComment,
  getCommentsBySubmission,
  updateComment,
  deleteComment,
} from "../models/commentModel";

// ➕ Add a comment to a submission
export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params; // submission ID
  const { reviewer_id, line_number, content } = req.body;

  if (!reviewer_id || !content) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Reviewer ID and content are required.",
      });
  }

  try {
    const comment = await addComment(
      Number(id),
      reviewer_id,
      line_number || null,
      content
    );
    res.status(201).json({ success: true, data: comment });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📜 Get all comments for a submission
export const listComments = async (req: Request, res: Response) => {
  const { id } = req.params; // submission ID
  try {
    const comments = await getCommentsBySubmission(Number(id));
    res.status(200).json({ success: true, data: comments });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Update a comment
export const editComment = async (req: Request, res: Response) => {
  const { id } = req.params; // comment ID
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "Content is required." });
  }

  try {
    const updated = await updateComment(Number(id), content);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete a comment
export const removeComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await deleteComment(Number(id));
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
