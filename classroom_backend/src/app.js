import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export const app = express();

config({
  path: "./data/config.env",
});

// Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));


//routes import
import userRouter from './routes/user.routes.js'
import classroomRouter from "./routes/classroom.routes.js";
import moduleRouter from "./routes/module.routes.js"
import noteRouter from "./routes/notes.routes.js"
import lectureRouter from "./routes/lecture.routes.js"
import assignmentRouter from "./routes/homework.routes.js"
import videoRouter from "./routes/video.routes.js"
import doubtRouter from "./routes/doubt.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/classrooms", classroomRouter);
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/lecture", lectureRouter);
app.use("/api/v1/assignment", assignmentRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/doubts", doubtRouter)

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);
export default app;
