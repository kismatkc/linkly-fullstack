import mongoose, { Schema } from "mongoose";
const GOOGLEUSERSCHEMA = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: true,
  },
});

const GoogleUser = mongoose.model("GoogleUser", GOOGLEUSERSCHEMA);
export default GoogleUser;
