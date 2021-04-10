import socketIo from "socket.io";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import Track from "../model/Tracking";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.WS_PORT || 8001;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to database"));

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval;

const findParcel = async (socket) => {
  const parcel = await Track.find({}, (err, parcel) => {
    if (err) throw err;
    console.log(parcel);
    return parcel;
  });
  socket.emit("parcel", parcel);
};

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => findParcel(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
