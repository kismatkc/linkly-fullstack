import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const USERSCHEMA = new Schema({
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
        index: true
    },
    password: {
        type: String,
        required: false,
    }, googleId: {
        type: String,
        required: false
    }
});
USERSCHEMA.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
const User = mongoose.model("User", USERSCHEMA);
export default User;
