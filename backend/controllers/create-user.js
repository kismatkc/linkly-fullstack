import User from "../models/user.js";
export default async function createUser(req, res) {
  try {
    const user = req.body;
    const response = await User.create(user);
    if (response) {
      res.status(201).json({ message: "User created", user });
    }
    res.status(500).json({ error: "user not created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
