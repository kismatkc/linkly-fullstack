import express from "express";
import CheckGoogleUser from "../controllers/check-user-existence.js";

const router = express.Router();

router.post("/check-google-user", CheckGoogleUser);
export default router;
