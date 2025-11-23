import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getWhatsAppLink } from "../controllers/connect.controller";

const router = Router();

router.get("/:userId", authMiddleware, getWhatsAppLink);

export default router;
