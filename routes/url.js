const express = require("express");
const {
  handleGenerateNewShortUrl,
  redirectToTheOriginalUrl,
  getAnalytics,
  getUrls,
} = require("../controllers/url");

const router = express.Router();




router.get('/',getUrls)
router.post("/url", handleGenerateNewShortUrl);


router.get("/analytics/:shortId", getAnalytics);


router.get("/:shortId", redirectToTheOriginalUrl);

module.exports = router;