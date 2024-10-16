import express from "express";
import RedirectUser from "../controllers/redirect-user.js";

const router = express.Router();

router.get("/:shortCode", RedirectUser);
export default router;
