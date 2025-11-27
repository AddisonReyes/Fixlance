import mongoose, { Schema } from "mongoose";
import { IUser } from "@fixlance/core";

const UserSchema: Schema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["client", "technician"], default: "client" },
  createdAt: { type: Date },
});

const User = mongoose.model<IUser>("user", UserSchema);

export default User;
