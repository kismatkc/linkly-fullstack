import mongoose, { Schema } from "mongoose";
const USERSCHEMA = new Schema({
    shortLink: {
        type: String,
        required: true,
    },
    originalLink: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const Url = mongoose.model("Url", USERSCHEMA);
export default Url;
