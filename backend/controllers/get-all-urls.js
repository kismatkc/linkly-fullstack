import Url from "../models/url.js";

export default async function GetUrls(req, res) {
  try {
    const _id = req.params;

    const response = await Url.find({ userId: _id });
    if (!response.length > 0)
      return res
        .status(404)
        .json({ success: false, message: "urls not found", data: null });

    res
      .status(200)
      .json({ success: true, message: "urls  found", data: response });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}
