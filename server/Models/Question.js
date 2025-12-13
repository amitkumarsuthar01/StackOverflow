import mongoose from "mongoose";
import { voteSchema } from "./Vote.js";


const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    body: { type: String, required: true },

    tags: { type: [String], default: [] },

    author: { type: String, required: true },

    votes: {
      type: [voteSchema],
      default: [],
    },

    views: { type: Number, default: 0 },

    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

    acceptedAnswerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
