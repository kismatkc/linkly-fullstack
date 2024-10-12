import GoogleUser from "../models/google-user.js";

async function AuthenticateGoogleUser(req, res) {
  try {
    const userDetails = req.body;
    const user = await GoogleUser.find({ email: userDetails.email });

    if (!(user.length > 0)) return res.status(404).send("user not found");

    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default AuthenticateGoogleUser;
