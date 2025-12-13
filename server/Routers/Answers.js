import express from "express";
import AnswerDB from "../Models/Answer.js";
import QuestionDB from "../Models/Question.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

/* ===============================
   CREATE ANSWER (PROTECTED)
================================ */
router.post("/", auth, async (req, res) => {
  try {
    const { questionId, body } = req.body;

    // VALIDATION
    if (!questionId || !body) {
      return res.status(400).json({
        success: false,
        message: "questionId and body are required",
      });
    }

    // 🔒 FORCE BODY TO STRING (CRITICAL)
    const answerBody =
      typeof body === "string" ? body : JSON.stringify(body);

    // CREATE ANSWER
    const newAnswer = new AnswerDB({
      questionId,
      body: answerBody,
      author: req.user.displayName || req.user.email, // ✅ secure
      comments: [],        // ✅ ready for comments
      isAccepted: false,
    });

    const savedAnswer = await newAnswer.save();

    // ATTACH ANSWER TO QUESTION
    const updatedQuestion = await QuestionDB.findByIdAndUpdate(
      questionId,
      { $push: { answers: savedAnswer._id } },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Answer created successfully!",
      answer: savedAnswer,
    });

  } catch (err) {
    console.error("Error creating answer:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
