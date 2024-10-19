import Url from "../models/url.js";

export default async function DeleteUrl(req, res) {
  try {
    console.log(req.body);
    
    const { longUrl, userId } = req.body;

    const url = await Url.deleteOne({
      originalLink: longUrl,

      userId: userId,
    });


    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
