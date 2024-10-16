import mongoose from "mongoose";
import jwt from "jsonwebtoken";
global.mongoDbConnnection = null;
export async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTIONSTRING || ""
    );
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log("Error connecting to database", error);
    return null;
  }
}
export async function ensureDatabaseConnection() {
  if (global.mongoDbConnnection === null) {
    global.mongoDbConnnection = await connectToDatabase();
  }
}

export const corsOption = () => ({
  origin: process.env.FRONTEND_URL,

  credentials: true,
});

export const createJWT = (user) =>
  jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

export const verifyJwt = (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  console.log("Token cookie:", req.cookies.token);
  console.log("Headers:", req.headers);
  next();
};
