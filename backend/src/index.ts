import express, { Request, Response, NextFunction } from "express";
import errors from "./middlewares/errors.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const env: string = process.env.NODE_ENV || "dev";
let port: string = process.env.PORT || "3000";

const app = express();

const connectionString: string | undefined =
  env === "prod" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;

// Settings
if (connectionString) {
  mongoose.connect(connectionString);
  console.log(" + Database conected.");
} else {
  console.log(" - The server does not have a connection link to the database.");
}

// Config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: env === "dev" ? `http://localhost:${port}` : process.env.URL,
  })
);

// Setup routes and middlewares
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hiii! :3" });
});

app.use(errors);

// Listen port
app.listen(port, () => {
  if (env === "dev") {
    console.log(`Server running in http://localhost:${port}.`);
  } else {
    console.log(`Server running.`);
  }
});
