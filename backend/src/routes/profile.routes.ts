import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { upsertProfile, getMyProfile, getProfileById } from "../controllers/profile.controller";

const router = Router();

router.put("/", authMiddleware, upsertProfile);      // create/update profile
router.get("/me", authMiddleware, getMyProfile);      // logged-in user profile
router.get("/:id", getProfileById);                   // public profile by ID

export default router;
