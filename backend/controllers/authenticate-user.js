import { createJWT } from "../lib/util.js";

async function AuthenticateUser(req, res) {
  try {
    const user = req.body;

    const token = createJWT(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error("Error in AuthenticateUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default AuthenticateUser;
