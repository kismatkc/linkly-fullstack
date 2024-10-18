import Url from "../models/url.js";
import crypto from "crypto";

export default async function CreateUrl(req, res) {
  try {
    const { longUrl, userId } = req.body;

    const urlExist = await Url.findOne({ originalLink: longUrl, userId });
    if (urlExist) {
      return res.status(200).json(urlExist[0]);
    }
    let environment = process.env.NEXT_PUBLIC_ENV;
    let shortLink = `http://localhost:4000/${crypto
      .randomBytes(4)
      .toString("hex")}`;
    if(environment === "replit"){
         shortLink = `https://31e908fa-c906-497c-9c86-bb5450c92e73-00-3dkixqsx8vovm.kirk.repl.co:3000/${crypto
      .randomBytes(4)
      .toString("hex")}`;
  }

    if(environment === "production"){

     shortLink = `https://backend.unfiltereddopamine.com/${crypto
      .randomBytes(4)
      .toString("hex")}`;
     
  }
    
 

    const url = await Url.create({
      originalLink: longUrl,
      shortLink: shortLink,
      userId: userId,
    });

    res.status(201).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
