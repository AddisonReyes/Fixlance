import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { ApiResponse, IUser } from "@fixlance/core";
import User from "../models/user.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/auth";

const router = express.Router();

//POST /api/auth/register - User registration
router.post(url + "/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user: IUser | null = await User.findOne({ name: name });
    if (user) {
      return res.status(400).json({ message: "This user already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt,
    });
    await newUser.save();

    return res.status(200).json({ message: "Registered user." });
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred during registration. Please try again.",
      erro: error,
    });
  }
});

//POST /api/auth/login - Login
router.post(url + "/login", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user: IUser | null = await User.findOne({ name: name });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ name }, "secret", { expiresIn: "1h" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: env === "prod",
          maxAge: 3600000, // 1h
        });

        return res.status(202).json({ message: "User logged successfully." });
      } else {
        return res.status(400).json({ message: "Wrong user or password." });
      }
    } else {
      return res.status(400).json({ message: "Wrong user or password." });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred.",
      error: error,
    });
  }
});

//GET /api/users/me - Authenticated user's profile
router.get("users/me", (req: Request, res: Response) => {
  res.status(200).json({ message: "me", status: 200 });
});

export default router;
