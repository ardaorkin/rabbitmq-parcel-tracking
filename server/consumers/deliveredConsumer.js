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
  .exchange("parcel-tracking", "topic", "*.delivered", { durable: false })
  .prefetch(1)
  .json()
  .subscribe(async (msg, ack, nack) => {
    const deliveredParcel = await Track.updateOne(
      { name: msg.name },
      { status: msg.status },
      (err, parcel) => {
        if (err) throw err;
        else return parcel;
      }
    );
    console.log("parcel was delivered:", deliveredParcel);
    ack();
  });
