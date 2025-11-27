import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, IReview } from "@fixlance/core";
import Review from "../models/review.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/reviews";

const router = express.Router();

// POST /api/reviews - Create review
router.post(url, async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error creating the review",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/reviews/:technicianId - Get reviews of a technician
router.get(url + "/:technicianId", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    const review = await Review.findById(id);
    res.status(200).send(review);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error finding the review.",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

export default router;
