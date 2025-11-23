import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);

  if (err.name === "ZodError") {
    return res.status(400).json({ error: "Validation error", details: err.issues });
  }

  return res.status(500).json({ error: err.message || "Internal server error" });
};
