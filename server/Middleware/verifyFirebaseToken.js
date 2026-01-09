import admin from "../config/firebaseAdmin.js";

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;
