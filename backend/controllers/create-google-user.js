import GoogleUser from "../models/google-user.js";

async function CreateGoogleUser(req, res) {
  try {
    const userDetails = req.body;

    const user = await GoogleUser.create(userDetails);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default CreateGoogleUser;
