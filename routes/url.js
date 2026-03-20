const express=require("express");
const {handleGenerateNewShortUrl,redirectToTheOriginalUrl,getAnalytics}=require('../controllers/url')

const router=express.Router();

router.post('/',handleGenerateNewShortUrl)
router.get('/:shortId',redirectToTheOriginalUrl)
router.get('/analytics/:shortId',getAnalytics)

module.exports=router;