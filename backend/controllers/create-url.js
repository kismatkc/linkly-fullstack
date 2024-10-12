import Url from "../models/url.js";
import crypto from "crypto";

export default async function CreateUrl(req, res) {
  try {
    const { longUrl, id } = req.body;
    const shortLink = `https://www.unfiltereddopamine.com/${crypto
      .randomBytes(4)
      .toString("hex")}`;
    const url = await Url.create({
      originalLink: longUrl,
      shortLink: shortLink,
      user: id,
    });

    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
