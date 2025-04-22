const express = require("express");
const router = express.Router();
const aicontroller = require("../controllers/ai.controllers.js");

router.post("/get-review",aicontroller.getReview);
module.exports = router;
