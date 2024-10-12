import LinklyUser from "../models/linkly-user.js";

async function CreateLinklyUser(req, res) {
  try {
    const userDetails = req.body;
    const exist = await LinklyUser.find({ email: userDetails.email });

    if (exist.length > 0) {
      return res.status(500).send("user already exist");
    }
    const user = await LinklyUser.create(userDetails);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default CreateLinklyUser;
