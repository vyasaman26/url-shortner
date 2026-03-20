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

const redirectToTheOriginalUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  return res.redirect(entry.redirectUrl);
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  redirectToTheOriginalUrl,
  getAnalytics,
};
