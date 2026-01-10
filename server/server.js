import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./Routers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://stack-overflow-jade-phi.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

connectDB();
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
