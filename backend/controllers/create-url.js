import Url from "../models/url.js";
import crypto from "crypto";

export default async function CreateUrl(req, res) {
  try {
    const { longUrl, userId } = req.body;
    // const shortLink = `https://www.unfiltereddopamine.com/${crypto
    //   .randomBytes(4)
    //   .toString("hex")}`;
    const shortLink = `http://localhost:4000/${crypto
      .randomBytes(4)
      .toString("hex")}`;
    const url = await Url.create({
      originalLink: longUrl,
      shortLink: shortLink,
      userId: userId,
    });

    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
