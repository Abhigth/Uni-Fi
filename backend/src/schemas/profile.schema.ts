import { z } from "zod";

export const profileSchema = z.object({
  branch: z.string().min(1).max(100).optional(),
  year: z.number().int().min(1).max(10).optional(),
  studyStyle: z.enum(["solo", "group", "flexible"]).optional(),
  preferredTime: z.enum(["morning", "afternoon", "evening", "night"]).optional(),
  interests: z.array(z.string().min(1).max(64)).optional(),
  activities: z.array(z.string().min(1).max(64)).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
