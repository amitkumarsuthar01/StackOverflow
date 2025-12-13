// middleware/auth.js
import admin from "../config/firebaseAdmin.js";

export default async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔥 VERIFY FIREBASE ID TOKEN
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken; // uid, email, name, etc.
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
