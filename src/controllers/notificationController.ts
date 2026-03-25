import { Request, Response } from "express";
import { pool } from "../config/database";

export const getNotifications = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
    [id],
  );

  res.json({ success: true, data: result.rows });
};
