const URL = require("../models/url");
const { nanoid } = require("nanoid");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = nanoid(9);

  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.redirect("/");
};

const redirectToTheOriginalUrl = async (req, res) => {
  const shortId = req.params.shortId;

  if (!shortId) return res.redirect("/");

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { returnDocument: "after" },
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectUrl);
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  redirectToTheOriginalUrl,
  getAnalytics,
};
