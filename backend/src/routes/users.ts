import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, IUser } from "@fixlance/core";
import User from "../models/user.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/auth";

const router = express.Router();

//POST /api/auth/register - User registration

//POST /api/auth/login - Login

//GET /api/users/me - Authenticated user's profile

export default router;
