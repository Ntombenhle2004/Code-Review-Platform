// import { Pool } from "pg";
// import dotenv from "dotenv";
// import { error } from "console";
// dotenv.config();
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "5432"),
// });
// export const query = (text: string, params?: any[]) => pool.query(text, params);
// export const testDBConnection = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Database connected successfully");
//     client.release();
//   } catch (err) {
//     console.error("Database connection error", error);
//     process.exit(1);
//   }
// };


import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Function to test the DB connection
export const testDBConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL database successfully!");
    client.release();
  } catch (err) {
    console.error("Failed to connect to PostgreSQL database", err);
  }
};
