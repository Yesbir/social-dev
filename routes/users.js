const express = require("express");

const router = express.Router();
// @route  GET /api/posts/test
// @access private
// @desc   this is posts/test route
router.get("/test", (req, res) => {
  res.json({ msg: "this is user routes" });
});

module.exports = router;
