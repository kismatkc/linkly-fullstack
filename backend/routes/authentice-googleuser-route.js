import express from "express";
import AuthenticateGoogleUser from "../controllers/authenticate-google-user.js";

const router = express.Router();

router.post("/authenticate-googleuser", AuthenticateGoogleUser);
export default router;
