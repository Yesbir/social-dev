const Validator = require("validator");
const _ = require("lodash");

exports.education = async (req, res, next) => {
    let { degree, institute, from } = req.body;
    degree = _.isEmpty(degree) ? "" : degree;
    institute = _.isEmpty(institute) ? "" : institute;
    from = _.isEmpty(from) ? "" : from;

    const errors = {};

    if (!Validator.isDate(from)) {
        errors.from = "Enter correct date  (YYYY-MM-DD)";
    }

    if (req.body.to) {
        req.body.current = false;
    } else {
        req.body.current = true;
    }

    if (req.body.to) {
        to = req.body.to;
        if (!Validator.isDate(req.body.to))
            errors.to = "Enter correct date  (YYYY-MM-DD)";
    }

    if (!degree) {
        errors.degree = "degree cannot be empty";
    }
    if (!institute) {
        errors.institute = "institute cannot be empty";
    }
    if (!from) {
        errors.from = "from cannot be empty";
    }

    if (_.isEmpty(errors)) {
        next();
    } else {
        res.status(400).json({ errors });
    }
};
