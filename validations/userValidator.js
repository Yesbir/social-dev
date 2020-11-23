const Validator = require("validator");
const _ = require("lodash");
const User = require("../models/User");

exports.login = (req, res, next) => {
  const errors = {};
  let { email, password } = req.body;
  password = _.isEmpty(password) ? "" : password;
  email = _.isEmpty(email) ? "" : email;

  const passwordLengthRange = { min: 8, max: 30 };
  if (!Validator.isLength(password, passwordLengthRange))
    errors.password = `password should be in between range ${passwordLengthRange.min} to ${passwordLengthRange.max}`;
  if (_.isEmpty(password)) errors.password = "password should not be empty";
  if (!Validator.isEmail(email)) errors.email = "enter valid email";

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "user not exist";
    }
    if (_.isEmpty(errors)) {
      next();
    } else {
      res.status(400).json({ errors });
    }
  });
};

exports.register = (req, res, next) => {
  let { name, email, password, password2 } = req.body;
  name = _.isEmpty(name) ? "" : name;
  password = _.isEmpty(password) ? "" : password;
  password2 = _.isEmpty(password2) ? "" : password2;
  email = _.isEmpty(email) ? "" : email;
  const errors = {};

  // name

  const nameLengthRange = { min: 3, max: 30 };
  if (!Validator.isLength(name.trim(), nameLengthRange))
    errors.name = `names should be in between range ${nameLengthRange.min} to ${nameLengthRange.max}`;
  if (_.isEmpty(name)) errors.name = "name should not be empty";

  // password

  const passwordLengthRange = { min: 8, max: 30 };

  if (!Validator.isLength(password, passwordLengthRange))
    errors.password = `password should be in between range ${passwordLengthRange.min} to ${passwordLengthRange.max}`;
  if (_.isEmpty(password)) errors.password = "password should not be empty";

  if (!(password === password2)) {
    errors.password = "password and confirmed password does not match";
  }

  // email

  if (!Validator.isEmail(email)) errors.email = "enter valid email";

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
    }
    if (_.isEmpty(errors)) {
      next();
    } else {
      res.status(400).json({ errors });
    }
  });
};
