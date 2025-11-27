import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, ITechnician } from "@fixlance/core";
import Technician from "../models/technician.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/technicians";

const router = express.Router();

// GET /api/technicians/:id - View detailed profile
router.get(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const technician = await Technician.findById(id);
    res.status(200).send(technician);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error finding the technician",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/technicians - List technicians (with filters)
router.get(url, async (req: Request, res: Response) => {
  try {
    const technicians = await Technician.find();
    res.status(200).send(technicians);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error fetching technicians",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// PUT /api/technicians/:id - Update profile
router.put(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await Technician.updateOne({ _id: id! }, req.body);
    res.status(200).send({ message: "Ok", status: 200 });
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error updating the technician",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// DELETE /api/technicians/:id - Delete account
router.delete(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await Technician.deleteOne({ _id: id! });
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error updating the technician",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

export default router;
