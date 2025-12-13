import rateLimit from "express-rate-limit";

// Strict: posting content
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50, // 50 actions
  message: {
    success: false,
    message: "Too many requests. Try again later."
  }
});

// Loose: read-only APIs
export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
});
