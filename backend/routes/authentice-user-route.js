import express from "express";
import AuthenticateUser from "../controllers/authenticate-user.js";

const router = express.Router();

router.post("/authenticate-user", AuthenticateUser);
export default router;
