import LinklyUser from "../models/linkly-user.js";
import bcrypt from "bcrypt";

async function AuthenticateLinklyUser(req, res) {
  try {
    const userDetails = req.body;
    const user = await LinklyUser.find({ email: userDetails.email });
    
    if (!(user.length > 0)) return res.status(404).send("user not found");
    const encryptedPassword = user[0].password;
    
    const passwordMatch = await bcrypt.compare(
      userDetails.password,
      encryptedPassword
    );
    
    if (!passwordMatch) return res.status(401).send("wrong credentials");
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default AuthenticateLinklyUser;
