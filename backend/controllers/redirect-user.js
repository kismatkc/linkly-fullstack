import Url from "../models/url.js";

async function RedirectUser(req, res) {
  try {
    const { shortCode } = req.params;
    const response = await Url.find({
      // shortLink: `http://localhost:4000/${shortCode}`,
      shortLink: `https://backend.unfiltereddopamine.com/${shortCode}`,
    });
    //   shortLink: `https://31e908fa-c906-497c-9c86-bb5450c92e73-00-3dkixqsx8vovm.kirk.repl.co:3000/${shortCode}`,
    // });
    if (!response.length > 0)
      return res.status(404).json({ message: "User not found" });
    const originalLink = response[0].originalLink;
    res.redirect(301, originalLink);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export default RedirectUser;
