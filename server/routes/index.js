import { Router } from "express";
import shippingPublishers from "../publishers/shippingPublisher";
import onroadPublisher from "../publishers/onroadPublisher";
import deliveredPublisher from "../publishers/deliveredPublisher";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to parcel tracking system");
});

router.get("/shipping/:name", async (req, res, next) => {
  const name = req.params.name;
  await shippingPublishers(name).then(res.send("shipping"));
});

router.get("/onroad/:name", async (req, res, next) => {
  const name = req.params.name;
  await onroadPublisher(name).then(res.send("onroad"));
});

router.get("/delivered/:name", async (req, res, next) => {
  const name = req.params.name;
  await deliveredPublisher(name).then(res.send("delivered"));
});

export default router;
