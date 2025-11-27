import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, IReview } from "@fixlance/core";
import Review from "../models/review.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/reviews";

const router = express.Router();

// POST /api/reviews - Create review

// GET /api/reviews/:technicianId - Get reviews of a technician

export default router;
