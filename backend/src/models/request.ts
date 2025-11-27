import mongoose, { Schema } from "mongoose";
import { IRequest } from "@fixlance/core";

const RequestSchema: Schema = new Schema({
  clientId: { type: String, require: true },
  technicianId: { type: String, require: true },
  description: { type: String },
  date: { type: Date },
  status: {
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
    type: String,
  },
});

const Request = mongoose.model<IRequest>("request", RequestSchema);

export default Request;
