const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { json } = require("body-parser");

const router = express.Router();
// @route  GET /api/posts/test
// @access private
// @desc   this is posts/test route
router.get("/test", (req, res) => {
  res.json({ msg: "this is user routes" });
});

// @route  POST /api/posts/test
// @access public
// @desc   user registration
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ email: "Email already exists" });
    } else {
      const encryptPassword = req.body.password;

      const avatar = gravatar.url({
        s: 200, //size
        r: "pg", //rating
        d: "mm", //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptPassword,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json({ user }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // check for user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // user matches
          //  res.json({ user: user });
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          //  jwt token
          const token = jwt.sign(payload, process.env.secretOrPrivateKey, {
            expiresIn: "2 days",
          });
          res.json({ login: "Success", token: `Bearer ${token}` });
        } else {
          return res.status(400).json({
            password: "incorrect password",
          });
        }
      });
    }
  });
});

module.exports = router;
