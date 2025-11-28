import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import techniciansRouter from "./routes/technicians.js";
import requestsRouter from "./routes/requests.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";
import errors from "./middlewares/errors.js";

dotenv.config();

let frontend: string = process.env.FRONTEND_PORT || "3001";
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
    origin: env === "dev" ? `http://localhost:${frontend}` : process.env.URL,
  })
);

// Setup routes and middlewares
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hiii! :3" });
});

app.use("/api", techniciansRouter);
app.use("/api", requestsRouter);
app.use("/api", reviewsRouter);
app.use("/api", usersRouter);

app.use(errors);

// Listen port
app.listen(port, () => {
  if (env === "dev") {
    console.log(`Server running in http://localhost:${port}.`);
  } else {
    console.log(`Server running.`);
  }
});
