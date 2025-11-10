// require("dotenv").config();
// import { error } from "console";
// import express, { Express, Request, NextFunction, Response } from "express";
// import path, { dirname } from "path";
// import { testDBConnection } from "./config/database";
// import userRoutes from "./route/userRoutes";

// import { request } from "http";
// const app: Express = express();
// app.use(express.json());
// //serve static ac
// app.use  (express.static(path.join(__dirname,"public")))


// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });



// app.use((request: Request, response: Response, next: NextFunction) => {
//   response
//     .status(404)
//     .json({ success: false, message: "Not found this route does not exist" });
// });

// app.use("/api/users", userRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Application is running on http://localhost:${process.env.PORT}`);
// });
// export default app;




require("dotenv").config();
import { error } from "console";
import express, { Express, Request, NextFunction, Response } from "express";
import path from "path";
import { testDBConnection } from "./config/database";
import userRoutes from "./route/userRoutes";
import projectRoutes from "./route/projectRoutes";
import submissionRoutes from "./route/submissionRoute";
import authRoutes from "./route/AuthRoutes";
import commentRoutes from "./route/commentRoutes";

const app: Express = express();
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", commentRoutes);

// 404 handler
app.use((request: Request, response: Response, next: NextFunction) => {
  response
    .status(404)
    .json({ success: false, message: "Not found: this route does not exist" });
});

// Start server properly with async DB test
const startServer = async () => {
  try {
    await testDBConnection(); // await the DB connection
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}`
      );
    });
  } catch (err) {
    console.error("Failed to start server due to DB connection error:", err);
    process.exit(1);
  }
};

startServer();



export default app;
