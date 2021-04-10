import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({
  name: String,
  status: String,
});

const Track = mongoose.model("Track", trackingSchema);

export default Track;
