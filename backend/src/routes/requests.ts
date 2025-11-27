import express, { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import { ApiResponse, IRequest } from "@fixlance/core";
import Requests from "../models/request.js";

const env: string = process.env.NODE_ENV || "dev";
const url: string = "/requests";

const router = express.Router();

// POST /api/requests - Create request

// GET /api/requests - List requests

// PUT /api/requests/:id - Update status

// DELETE /api/requests/:id - Cancel request

export default router;
