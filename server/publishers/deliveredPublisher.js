import Tortoise from "tortoise";
import dotenv from "dotenv";
dotenv.config();

const tortoise = new Tortoise(process.env.AMQP_SERVER);

const deliveredPublisher = (name) =>
  new Promise((resolve, reject) => {
    tortoise
      .exchange("parcel-tracking", "topic", { durable: false })
      .publish("parcel.delivered", { name, status: "delivered" });
    resolve(tortoise);
  });

export default deliveredPublisher;
