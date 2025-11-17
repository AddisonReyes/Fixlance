import express, { Request, Response, NextFunction } from "express";
import errors from "./middlewares/errors.js";
import users from "./routes/users.js";
import mongoose from "mongoose";

const env: string = process.env.NODE_ENV || "prod";
const port: string = process.env.PORT || "3000";

// MongoDB conection
const connectionString: string | undefined =
  env === "prod" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;
if (connectionString) {
  mongoose.connect(connectionString);
}

// Config
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup routes and middlewares
app.use(users);
app.use(errors);

// Listen ports
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
