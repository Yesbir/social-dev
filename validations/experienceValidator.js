const Validator = require("validator");
const _ = require("lodash");

exports.experience = async (req, res, next) => {
    let { title, company, from } = req.body;
    title = _.isEmpty(title) ? "" : title;
    company = _.isEmpty(company) ? "" : company;
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

    if (!title) {
        errors.title = "title cannot be empty";
    }
    if (!company) {
        errors.company = "company cannot be empty";
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
