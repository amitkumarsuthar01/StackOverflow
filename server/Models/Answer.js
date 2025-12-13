import mongoose from "mongoose";
import { voteSchema } from "./Vote.js";


const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true, // 🚀 performance
    },

    body: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    votes: {
      type: [voteSchema],
      default: [],
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
