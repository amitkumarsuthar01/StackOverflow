import express from "express";
import mongoose from "mongoose";
import QuestionDB from "../Models/Question.js";
import AnswerDB from "../Models/Answer.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { targetType, targetId, value } = req.body;

    if (!["Question", "Answer"].includes(targetType)) {
      return res.status(400).json({ message: "Invalid targetType" });
    }

    if (![1, -1].includes(value)) {
      return res.status(400).json({ message: "Invalid vote value" });
    }

    const Model =
      targetType === "Question" ? QuestionDB : AnswerDB;

    const doc = await Model.findById(targetId);
    if (!doc) {
      return res.status(404).json({ message: "Not found" });
    }

    const userId = req.user.uid; // 🔥 Firebase UID

    const existingVote = doc.votes.find(
      (v) => v.userId === userId
    );

    if (existingVote) {
      if (existingVote.value === value) {
        // Remove vote (toggle)
        doc.votes = doc.votes.filter(
          (v) => v.userId !== userId
        );
      } else {
        // Change vote
        existingVote.value = value;
      }
    } else {
      // Add new vote
      doc.votes.push({ userId, value });
    }

    await doc.save();

    res.json({
      success: true,
      votes: doc.votes,
    });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Vote failed" });
  }
});


export default router;
