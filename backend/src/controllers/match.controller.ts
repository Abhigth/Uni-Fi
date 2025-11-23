import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  interestScore,
  studyStyleScore,
  preferredTimeScore,
  branchScore,
  yearScore
} from "../utils/matchUtils";
import { MATCH_WEIGHTS } from "../config/matchWeights";


const prisma = new PrismaClient();

export const getMatches = async (req: Request, res: Response) => {
  if (!req.userId) throw new Error("Unauthorized");

  // Logged-in user profile
  const me = await prisma.profile.findUnique({
    where: { userId: req.userId },
  });

  if (!me) throw new Error("You must create a profile first");

  // All other profiles
  const others = await prisma.profile.findMany({
    where: { userId: { not: req.userId } },
    include: { user: { select: { id: true, name: true } } }
  });

  const results = others.map(p => {
    // Convert null → undefined (TypeScript fix)
    const meStyle = me.studyStyle ?? undefined;
    const pStyle = p.studyStyle ?? undefined;

    const meTime = me.preferredTime ?? undefined;
    const pTime = p.preferredTime ?? undefined;

    const meBranch = me.branch ?? undefined;
    const pBranch = p.branch ?? undefined;

    const meYear = me.year ?? undefined;
    const pYear = p.year ?? undefined;

    const score =
  interestScore(me.interests, p.interests) * MATCH_WEIGHTS.interests +
  studyStyleScore(meStyle, pStyle) * MATCH_WEIGHTS.studyStyle +
  preferredTimeScore(meTime, pTime) * MATCH_WEIGHTS.preferredTime +
  branchScore(meBranch, pBranch) * MATCH_WEIGHTS.branch +
  yearScore(meYear, pYear) * MATCH_WEIGHTS.year;


    return {
      userId: p.userId,
      name: p.user.name,
      score: Number(score.toFixed(3)),
      commonInterests: me.interests.filter(i => p.interests.includes(i)),
      profile: p
    };
  });

  // Sort and limit
  results.sort((a, b) => b.score - a.score);

  return res.json({ matches: results.slice(0, 7) });
};
