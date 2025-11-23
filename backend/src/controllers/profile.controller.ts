import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { profileSchema } from "../schemas/profile.schema";

const prisma = new PrismaClient();

export const upsertProfile = async (req: Request, res: Response) => {
  if (!req.userId) throw new Error("Unauthorized");

  const parsed = profileSchema.parse(req.body);

const data = {
  branch: parsed.branch ?? null,
  year: parsed.year ?? null,
  studyStyle: parsed.studyStyle ?? null,
  preferredTime: parsed.preferredTime ?? null,
  interests: parsed.interests ?? [],
  activities: parsed.activities ?? []
};


  const profile = await prisma.profile.upsert({
    where: { userId: req.userId },
    create: { userId: req.userId, ...data },
    update: { ...data },
  });

  return res.json({ profile });
};

export const getMyProfile = async (req: Request, res: Response) => {
  if (!req.userId) throw new Error("Unauthorized");

  const profile = await prisma.profile.findUnique({
    where: { userId: req.userId },
    include: {
      user: { select: { id: true, name: true, email: true } }
    }
  });

  if (!profile) throw new Error("Profile not found");

  return res.json({ profile });
};

export const getProfileById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const profile = await prisma.profile.findUnique({
    where: { userId: id },
    include: {
      user: { select: { id: true, name: true } }
    }
  });

  if (!profile) throw new Error("Profile not found");

  return res.json({ profile });
};
