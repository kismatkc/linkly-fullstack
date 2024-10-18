import dotenv from "dotenv";
import express from "express";
import CORS from "cors";
import { corsOption, ensureDatabaseConnection, verifyJwt } from "./lib/util.js";
import CreateLinklyUserRoute from "./routes/create-linkly-user-route.js";
import CreateGoogleUserRoute from "./routes/create-google-user-route.js";
import CheckGoogleUserRoute from "./routes/check-user-existence-route.js";
import AuthenticateUserRoute from "./routes/authentice-user-route.js";
import AuthenticateLinklyUserRoute from "./routes/authentice-linklyuser-route.js";
import AuthenticateGoogleUserRoute from "./routes/authentice-googleuser-route.js";
import CreateUrlRoute from "./routes/create-url-route.js";
import DeleteUrlRoute from "./routes/delete-url-route.js";
import RedirectUserRoute from "./routes/redirect-user-route.js";
import GetUrlsRoute from "./routes/get-all-urls.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(CORS(corsOption()));
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.port || 4000; // Corrected environment variable
if (!PORT) {
  throw new Error("Please provide a valid port");
}

ensureDatabaseConnection();

app.use("/api", CreateLinklyUserRoute);
app.use("/api", CreateGoogleUserRoute);
app.use("/api", CheckGoogleUserRoute);
app.use("/api", AuthenticateUserRoute);
app.use("/api", AuthenticateLinklyUserRoute);
app.use("/api", AuthenticateGoogleUserRoute);
app.use("/", RedirectUserRoute);

app.use("/api", GetUrlsRoute);
app.use("/api", CreateUrlRoute);
app.use("/api", DeleteUrlRoute);
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
