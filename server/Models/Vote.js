import mongoose from "mongoose";

export const voteSchema = new mongoose.Schema(
  {
    // Firebase UID of voter
    userId: {
      type: String,
      required: true,
    },

    // +1 = upvote, -1 = downvote
    value: {
      type: Number,
      enum: [1, -1],
      required: true,
    },
  },
  {
    _id: false,      // ❗ no separate _id for votes
    timestamps: true,
  }
);
