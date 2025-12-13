import express from "express";
import mongoose from "mongoose";
import CommentDB from "../Models/Comment.js";
import AnswerDB from "../Models/Answer.js";
import QuestionDB from "../Models/Question.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

/* ===============================
   CREATE COMMENT (PROTECTED)
================================ */
router.post("/", auth, async (req, res) => {
  try {
    const { body, parentType, parentId, questionId } = req.body;

    if (!body || !parentType || !parentId || !questionId) {
      return res.status(400).json({
        success: false,
        message: "body, parentType, parentId and questionId are required",
      });
    }

    if (!["Question", "Answer"].includes(parentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parentType",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(parentId) ||
      !mongoose.Types.ObjectId.isValid(questionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid ObjectId format",
      });
    }

    // 🔐 Ensure parent belongs to question
    if (parentType === "Answer") {
      const answer = await AnswerDB.findById(parentId);
      if (!answer || answer.questionId.toString() !== questionId) {
        return res.status(400).json({
          success: false,
          message: "Answer does not belong to this question",
        });
      }
    }

    const comment = await CommentDB.create({
      body,
      author: req.user.displayName || req.user.email,
      parentType,
      parentId,
      questionId,
    });

    if (parentType === "Question") {
      await QuestionDB.findByIdAndUpdate(parentId, {
        $push: { comments: comment._id },
      });
    }

    if (parentType === "Answer") {
      await AnswerDB.findByIdAndUpdate(parentId, {
        $push: { comments: comment._id },
      });
    }

    const populatedComment = await CommentDB.findById(comment._id);

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


export default router;
