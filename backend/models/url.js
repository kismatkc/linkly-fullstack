import mongoose, { Schema } from "mongoose";
const USERSCHEMA = new Schema({
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  originalLink: {
    type: String,
    required: true,

  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});
USERSCHEMA.index({originalLink: 1, userId: 1},{unique: true})
const Url = mongoose.model("Url", USERSCHEMA);
export default Url;
