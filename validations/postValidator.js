const _ = require("lodash");
exports.postValidator = (req, res, next) => {
    const text = req.body.text;
    const errors = {};
    if (!text) {
        errors.text = "post cannot be empty";
    }
    if (_.isEmpty(errors)) next();
    else res.json({ errors });
};
