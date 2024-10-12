import express from "express";
import AuthenticateLinklyUser from "../controllers/authenticate-linkly-user.js";

const router = express.Router();

router.post("/authenticate-linklyuser", AuthenticateLinklyUser);
export default router;
