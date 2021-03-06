const User = require("../models/User");
const Profile = require("../models/Profile");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// delete user

exports.deleteUser = async (req, res) => {
  const id = req.user.id;
  const email = req.user.email;
  try {
    const user = await User.findOneAndRemove({ _id: id });

    if (user) {
      await Profile.findOneAndRemove({ user: id });
      res.json({ deleteUser: user });
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (err) {
    res.status(400).json({
      error: "Something is Wrong user not deleted try again later",
      err,
    });
  }
};

const genToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
  //  jwt token
  const token = jwt.sign(payload, process.env.secretOrPrivateKey, {
    expiresIn: "2 days",
  });
  return { msg: "Success", token: `Bearer ${token}` };
};

exports.register = (req, res) => {
  const encryptPassword = req.body.password;

  const avatar = gravatar.url({
    s: 200, //size
    r: "pg", //rating
    d: "mm", //default
  });
  const newUser = new User({
    name: req.body.name.trim(),
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
        .then((user) => {
          const token = genToken(user);
          res.json({ registration: token.msg, token: token.token });
        })
        .catch((err) => console.log(err));
    });
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // check for user
  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // user matches
          //  res.json({ user: user });
          const token = genToken(user);
          res.json({ login: token.msg, token: token.token });
        } else {
          return res.status(400).json({
            errors: {
              password: "incorrect password",
            },
          });
        }
      });
    }
  });
};

exports.jwtCurrent = (req, res) => {
  const user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user.id,
  };
  res.json({ user });
};
