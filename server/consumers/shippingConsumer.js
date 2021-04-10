import Tortoise from "tortoise";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Track from "../model/Tracking";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to database"));

const tortoise = new Tortoise(process.env.AMQP_SERVER);
tortoise
  .queue("", { durable: false })
  .exchange("parcel-tracking", "topic", "*.shipping", { durable: false })
  .prefetch(1)
  .json()
  .subscribe((msg, ack, nack) => {
    const newParcel = new Track(msg);
    newParcel.save((err, parcel) => {
      if (err) throw err;
      console.log("shipped parcel:", parcel);
      return parcel;
    });
    ack();
  });
