import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, IRequest } from "@fixlance/core";
import Requests from "../models/request.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/requests";

const router = express.Router();

// POST /api/requests - Create request
router.post(url, async (req: Request, res: Response) => {
  try {
    const request = new Requests(req.body);
    await request.save();
    res.status(201).send(request);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error creating the request.",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/requests - List requests
router.get(url, async (req: Request, res: Response) => {
  try {
    const request = await Requests.find();
    res.status(200).send(request);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error fetching requests.",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// PUT /api/requests/:id - Update status
router.put(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    await Requests.updateOne({ _id: id! }, req.body);
    res.status(200).send({ message: "200 - Ok" });
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error updating the request.",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// DELETE /api/requests/:id - Cancel request
router.delete(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    await Requests.deleteOne({ _id: id! });
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error deleting the request",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

export default router;
