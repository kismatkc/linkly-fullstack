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
    unique: true,
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
const Url = mongoose.model("Url", USERSCHEMA);
export default Url;
