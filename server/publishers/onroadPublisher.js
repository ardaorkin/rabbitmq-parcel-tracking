import Tortoise from "tortoise";
import dotenv from "dotenv";
dotenv.config();

const tortoise = new Tortoise(process.env.AMQP_SERVER);

const onroadPublisher = (name) =>
  new Promise((resolve, reject) => {
    tortoise
      .exchange("parcel-tracking", "topic", { durable: false })
      .publish("parcel.onroad", { name, status: "onroad" });
    resolve(tortoise);
  });

export default onroadPublisher;
