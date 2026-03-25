import { Request, Response } from "express";
import { pool } from "../config/database";

export const createSubmission = async (req: Request, res: Response) => {
  const { project_id, submitted_by, code, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO submissions (project_id, submitted_by, code, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [project_id, submitted_by, code, status || "pending"],
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllSubmissions = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM submissions ORDER BY id ASC`,
    );
    res.status(200).json({ success: true, data: result.rows });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM submissions WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM submissions WHERE id = $1 RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { project_id, submitted_by, code, status } = req.body;

  if (!project_id && !submitted_by && !code && !status) {
    return res
      .status(400)
      .json({ success: false, message: "No fields to update" });
  }

  try {
    const result = await pool.query(
      `UPDATE submissions
       SET project_id = COALESCE($1, project_id),
           submitted_by = COALESCE($2, submitted_by),
           code = COALESCE($3, code),
           status = COALESCE($4, status)
       WHERE id = $5
       RETURNING *`,
      [project_id, submitted_by, code, status, id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubmissionsByProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT * FROM submissions WHERE project_id = $1`,
    [id],
  );

  res.json({ success: true, data: result.rows });
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    `UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id],
  );

  res.json({ success: true, data: result.rows[0] });
};

export const approveSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewer_id } = req.body;

  await pool.query(`UPDATE submissions SET status = 'approved' WHERE id = $1`, [
    id,
  ]);

  await pool.query(
    `INSERT INTO reviews (submission_id, reviewer_id, status)
     VALUES ($1, $2, 'approved')`,
    [id, reviewer_id],
  );

  res.json({ message: "Submission approved" });
};

export const requestChanges = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewer_id } = req.body;

  await pool.query(
    `UPDATE submissions SET status = 'changes_requested' WHERE id = $1`,
    [id],
  );

  await pool.query(
    `INSERT INTO reviews (submission_id, reviewer_id, status)
     VALUES ($1, $2, 'changes_requested')`,
    [id, reviewer_id],
  );

  res.json({ message: "Changes requested" });
};

export const getReviewHistory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT * FROM reviews WHERE submission_id = $1`,
    [id],
  );

  res.json({ success: true, data: result.rows });
};