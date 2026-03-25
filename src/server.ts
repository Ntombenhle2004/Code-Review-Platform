require("dotenv").config();

import express, { Express, Request, NextFunction, Response } from "express";
import path from "path";
import { testDBConnection } from "./config/database";
import { initDb } from "./config/initDB";
import userRoutes from "./route/userRoutes";
import projectRoutes from "./route/projectRoutes";
import submissionRoutes from "./route/submissionRoute";
import authRoutes from "./route/AuthRoutes";
import commentRoutes from "./route/commentRoutes";
import notificationRoutes from "./route/notificationRoute";
import { errorHandler } from "./middleware/errorHandle";

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", commentRoutes);
app.use("/api", notificationRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Not found: this route does not exist" });
});

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await testDBConnection();
    await initDb();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Application is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to DB connection error:", err);
    process.exit(1);
  }
};

startServer();

export default app;
