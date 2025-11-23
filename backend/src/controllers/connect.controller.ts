import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWhatsAppLink = async (req: Request, res: Response) => {
  const targetId = Number(req.params.userId);

  if (!targetId) return res.status(400).json({ error: "Invalid user id" });

  // Make sure the requester is logged in
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  // Fetch target user
  const targetUser = await prisma.user.findUnique({
    where: { id: targetId },
    select: { name: true, phone: true }
  });

  if (!targetUser) return res.status(404).json({ error: "User not found" });

  if (!targetUser.phone) {
    return res.status(400).json({ error: "This user has no phone number set" });
  }

  // Auto-filled message
  const msg = encodeURIComponent(
    `Hey ${targetUser.name}! 👋 I found you on Uni-Fi and would like to connect/study together!`
  );

  const link = `https://wa.me/${targetUser.phone}?text=${msg}`;

  return res.json({ link });
};
