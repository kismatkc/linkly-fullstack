import { createJWT } from "../lib/util.js";

async function AuthenticateUser(req, res) {
  try {
    const user = req.body;
    const token = createJWT(user);
    console.log(token);

    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default AuthenticateUser;
