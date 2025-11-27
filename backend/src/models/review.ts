import mongoose, { Schema } from "mongoose";
import { IReview } from "@fixlance/core";

const ReviewSchema: Schema = new Schema({
  requestId: { type: String, require: true },
  technicianId: { type: String, require: true },
  clientId: { type: String, require: true },
  rating: { type: Number },
  comment: { type: String },
});

const Review = mongoose.model<IReview>("review", ReviewSchema);

export default Review;
