import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";   // << ADD THIS
import matchRoutes from "./routes/match.routes";
import connectRoutes from "./routes/connect.routes";
import { errorHandler } from "./middleware/errorHandler";  // << ADD THIS
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic check route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Uni-Fi backend 👋" });
});

// Health check
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ ok: true, time: result });
  } catch (e) {
    console.error(e);
    res.json({ ok: false, error: e });
  }
});

// --- AUTH ROUTES ---
app.use("/api/auth", authRoutes);

// --- PROFILE ROUTES ---
app.use("/api/profile", profileRoutes);  // << ADD THIS

// --- MATCH ROUTES ---
app.use("/api/matches", matchRoutes);

// --- WHATSAPP ROUTES ---
app.use("/api/connect", connectRoutes);


// Example (GET all users)
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
    });
    res.json(users);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- ERROR HANDLER MUST BE LAST ---
app.use(errorHandler);  // << ADD THIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
