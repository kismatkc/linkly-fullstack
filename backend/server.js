import dotenv from "dotenv";
import express from "express";
import CORS from "cors";
import { corsOption, ensureDatabaseConnection } from "./lib/util.js";
import CreateLinklyUserRoute from "./routes/create-linkly-user-route.js";
import CreateGoogleUserRoute from "./routes/create-google-user-route.js";
import CheckGoogleUserRoute from "./routes/check-user-existence-route.js";
import AuthenticateUserRoute from "./routes/authentice-user-route.js";

dotenv.config();

const app = express();

app.use(CORS(corsOption()));
app.use(express.json());
const PORT = process.env.port; // Corrected environment variable
if (!PORT) {
  throw new Error("Please provide a valid port");
}

ensureDatabaseConnection();

app.use("/api", CreateLinklyUserRoute);
app.use("/api", CreateGoogleUserRoute);
app.use("/api", CheckGoogleUserRoute);
app.use("/api", AuthenticateUserRoute);
app.use("/", (req, res) => {
  res.send("Hello worlbmdpoo");
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
