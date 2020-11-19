const express = require("express");

const router = express.Router();
// @route  GET /api/profile/test
// @access public
// @desc   this is profile/test route
router.get("/test", (req, res) => res.json({ msg: "this is profile" }));

module.exports = router;
