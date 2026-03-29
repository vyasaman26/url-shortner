const express = require("express");
const {
  handleGenerateNewShortUrl,
  redirectToTheOriginalUrl,
  getAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", getAnalytics);
router.get("/:shortId", redirectToTheOriginalUrl);

module.exports = router;
