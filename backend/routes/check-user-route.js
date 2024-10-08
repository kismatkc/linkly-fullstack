import express from "express";
import checkUser from "../controllers/check-user.js";
const router = express.Router();
router.post("/check-user", checkUser);
export default router;
