import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    name: String,
    photoURL: String,
    provider: String,

    role: { type: String, default: "user" },

    createdAt: { type: Date, default: Date.now },   // first time
    lastLoginAt: { type: Date },                     // every login
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
