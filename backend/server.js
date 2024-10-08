import dotenv from "dotenv";
import express from "express";
import CORS from "cors";
import { ensureDatabaseConnection } from "./lib/util.js";
import createUserRoute from "./routes/create-user-route.js";
import authenticateUserRoute from "./routes/authenticate-user-route.js";
import checkUserRoute from "./routes/check-user-route.js";
dotenv.config();
const app = express();
app.use(CORS());
app.use(express.json());
const PORT = process.env.port; // Corrected environment variable
if (!PORT) {
  throw new Error("Please provide a valid port");
}

ensureDatabaseConnection();
app.use("/api", createUserRoute);
app.use("/api", authenticateUserRoute);
app.use("/api", checkUserRoute);
app.use("/", (req, res) => {
  res.send("Hello worlb");
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
