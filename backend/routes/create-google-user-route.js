import express from "express";
import CreateGoogleUser from "../controllers/create-google-user.js";

const router = express.Router();

router.post("/create-google-user", CreateGoogleUser);
export default router;
