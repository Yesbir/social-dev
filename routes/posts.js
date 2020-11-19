const express = require("express");

const router = express.Router();
// @route  GET /api/posts/test
// @access public
// @desc   this is posts/test route
router.get("/test", (req, res) =>
  res.json({ msg: "this is posts" }).status(200)
);

module.exports = router;
