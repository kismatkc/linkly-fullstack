import express from "express";
import GetUrls from "../controllers/get-all-urls.js";

const router = express.Router();

router.get("/url/:_id", GetUrls);
export default router;
