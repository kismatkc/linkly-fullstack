import Url from "../models/url.js";

export default async function DeleteUrl(req, res) {
  try {
    const { longUrl, userId } = req.body;
    console.log(longUrl, userId);

    const url = await Url.deleteOne({
      originalLink: longUrl,

      userId: userId,
    });
    console.log(url);

    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
