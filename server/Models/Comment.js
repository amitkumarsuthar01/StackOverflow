import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    // "Question" or "Answer"
    parentType: {
      type: String,
      enum: ["Question", "Answer"],
      required: true,
    },

    // ID of the parent (question or answer)
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "parentType",
      index: true, // 🚀 performance
    },

    // Always store questionId for fast grouping
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true, // 🚀 performance
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
