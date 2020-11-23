const express = require("express");

const passport = require("passport");

const User = require("../models/User");
const userController = require("../controllers/userController");
const userValidator = require("../validations/userValidator");

const router = express.Router();
// @route  GET /api/posts/test
// @access private
// @desc   this is posts/test route
router.get("/test", (req, res) => {
    res.json({ msg: "this is user routes" });
});

router.post("/register", userValidator.register, userController.register);

router.post("/login", userValidator.login, userController.login);

router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    userController.jwtCurrent
);
router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    userController.deleteUser
);

module.exports = router;
