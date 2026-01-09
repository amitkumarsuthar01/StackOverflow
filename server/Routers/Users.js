import express from "express";
import verifyFirebaseToken from "../Middleware/verifyFirebaseToken.js";
import User from "../Models/User.js";

const router = express.Router();

router.post("/me", verifyFirebaseToken, async (req, res) => {

  const { uid, email, name, picture, firebase } = req.firebaseUser;

  const user = await User.findOneAndUpdate(
    { firebaseUid: uid },                 // unique user
    {
      firebaseUid: uid,
      email,
      name: name || "User",
      photoURL: picture || null,
      provider: firebase?.sign_in_provider || "password",
      lastLoginAt: new Date(),             // updates every login
    },
    {
      upsert: true,                       // create if not exists
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  res.json(user);
});

export default router;
