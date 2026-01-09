import express from "express";

import questionRouter from "./Questions.js";
import answerRouter from "./Answers.js";
import commentRouter from "./Comments.js";
import voteRouter from "./Votes.js";
import authRouter from "./Users.js";

import auth from "../Middleware/auth.js";
import { readLimiter, writeLimiter } from "../Middleware/rateLimit.js";

const router = express.Router();

/* ================= ROOT ================= */
router.get("/", (req, res) => {
  res.send("Welcome to StackOverflow API");
});

/* ================= QUESTIONS ================= */
// ✅ Public: list questions
router.use("/question", readLimiter, questionRouter);

/* ================= ANSWERS ================= */
// 🔒 Protected
router.use("/answer", writeLimiter, auth, answerRouter);

/* ================= COMMENTS ================= */
// 🔒 Protected
router.use("/comment", writeLimiter, auth, commentRouter);

/* ================= VOTES ================= */
// 🔒 Protected
router.use("/vote", writeLimiter, auth, voteRouter);

/* ================= USERS ================= */
// 🔒 Protected
router.use("/auth", authRouter);


export default router;