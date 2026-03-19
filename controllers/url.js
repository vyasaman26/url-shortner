const URL = require("../models/url");
const { nanoid } = require("nanoid");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = nanoid(9);

  await URL.create({
    shortId: shortId,        
    redirectUrl: body.url,   
    visitHistory: [],
  });

  return res.json({ id: shortId });
};

module.exports = { handleGenerateNewShortUrl };