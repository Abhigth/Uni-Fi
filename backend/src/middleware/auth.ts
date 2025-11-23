import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = auth.split(" ")[1]!;  // <— fully safe now
    const payload = jwt.verify(token, JWT_SECRET) as any;

    if (!payload || !payload.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await prisma.user.findUnique({ where: { id: Number(payload.userId) } });

    if (!user) {
      return res.status(401).json({ error: "Invalid token - user not found" });
    }

    (req as any).userId = user.id;
    next();
  } catch (err) {
    console.error("auth middleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
