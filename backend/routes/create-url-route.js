import express from "express";
import CreateUrl from "../controllers/create-url.js";

const router = express.Router();

router.post("/create-url", CreateUrl);
export default router;
