import GoogleUser from "../models/google-user.js";

async function CheckGoogleUser(req, res) {
  try {
    const email = req.body;
    const response = await GoogleUser.find(email);
    if (response.length > 0) return res.status(404).send({ message: "found" });
    res.status(200).send({ message: "not found" });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default CheckGoogleUser;
