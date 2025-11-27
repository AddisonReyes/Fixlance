import express, { Request, Response, NextFunction } from "express";

const errors = express.Router();

// Client errors
errors.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found", status: 404 });
});

// Server errors
errors.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message, status: 500 });
});

export default errors;
