import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import sweetRoutes from "./src/routes/sweet.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// // ✅ CORS must come first
// app.use(cors({
//   origin: "http://localhost:5173", // React dev server URL
//   credentials: true                // allow cookies/authorization headers
// }));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
import bagRoutes from "./src/routes/bag.route.js";

app.use("/api/bag", bagRoutes);
// Start server
app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
