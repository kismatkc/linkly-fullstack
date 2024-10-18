import express from "express";
import DeleteUrl from "../controllers/delete-url.js";

const router = express.Router();

router.post("/delete-url", DeleteUrl);
export default router;
