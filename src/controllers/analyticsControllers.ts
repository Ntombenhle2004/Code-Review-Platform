import { Request, Response } from "express";
import { pool } from "../config/database";

export const getProjectStats = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT 
        COUNT(*) AS total_submissions,
        COUNT(*) FILTER (WHERE status = 'approved') AS approved
     FROM submissions
     WHERE project_id = $1`,
    [id],
  );

  res.json({ success: true, data: result.rows[0] });
};
