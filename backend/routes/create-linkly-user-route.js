import express from "express";
import CreateLinklyUser from "../controllers/create-linkly-user.js";

const router = express.Router();

router.post("/create-linkly-user", CreateLinklyUser);
export default router;
