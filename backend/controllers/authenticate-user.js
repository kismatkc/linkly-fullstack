import { createJWT } from "../lib/util.js";

async function AuthenticateUser(req, res) {
  try {
    const user = req.body;

    const token = createJWT(user);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
      path: "/", // Make sure the cookie is available for all paths
    };
    res.cookie("token", token, cookieOptions);
    console.log("Response headers:", res.getHeaders());
    console.log("Cookies in response:", res.getHeaders()["set-cookie"]);
    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error("Error in AuthenticateUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default AuthenticateUser;
