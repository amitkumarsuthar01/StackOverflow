import express from "express";
import mongoose from "mongoose";
import QuestionDB from "../Models/Question.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

/* ===============================
   CREATE QUESTION (PROTECTED)
================================ */
router.post("/", auth, async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "title and body are required",
      });
    }

    const question = await QuestionDB.create({
      title,
      body,
      tags: tags || [],
      author: req.user.displayName || req.user.email,
      views: 0,
    });

    res.status(201).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Create question error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ===============================
   GET ALL QUESTIONS (PUBLIC)
================================ */
router.get("/", async (req, res) => {
  try {
    const questions = await QuestionDB.find({})
      .sort({ createdAt: -1 })
      .select("title body tags votes views answers author createdAt")
      .lean();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error("Get all questions error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
});

/* ===============================
   SEARCH QUESTIONS (PUBLIC)
================================ */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        questions: [],
      });
    }

    const questions = await QuestionDB.find(
      {
        $text: { $search: q },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10)
      .select("title tags views answers createdAt")
      .lean();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error("Search questions error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to search questions",
    });
  }
});


/* ===============================
   GET SINGLE QUESTION (PROTECTED)
================================ */
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await QuestionDB.findById(id)
      .populate({
        path: "comments",
        options: { sort: { createdAt: 1 } },
      })
      .populate({
        path: "answers",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "comments",
          options: { sort: { createdAt: 1 } },
        },
      });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // increment views
    question.views += 1;
    await question.save();

    res.json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Get single question error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
