import { pool } from "../config/database";

export const addComment = async (
  submission_id: number,
  reviewer_id: number,
  line_number: number | null,
  content: string
) => {
  const result = await pool.query(
    `INSERT INTO comments (submission_id, reviewer_id, line_number, content)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [submission_id, reviewer_id, line_number, content]
  );
  return result.rows[0];
};

export const getCommentsBySubmission = async (submission_id: number) => {
  const result = await pool.query(
    `SELECT c.*, u.name AS reviewer_name
     FROM comments c
     LEFT JOIN users u ON c.reviewer_id = u.id
     WHERE c.submission_id = $1
     ORDER BY c.created_at ASC`,
    [submission_id]
  );
  return result.rows;
};

export const updateComment = async (id: number, content: string) => {
  const result = await pool.query(
    `UPDATE comments
     SET content = $1
     WHERE id = $2
     RETURNING *`,
    [content, id]
  );
  return result.rows[0];
};

export const deleteComment = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM comments
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
