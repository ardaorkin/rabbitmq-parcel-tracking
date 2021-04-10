import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to database"));
const app = express();
const port = process.env.PORT;

app.use(router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
