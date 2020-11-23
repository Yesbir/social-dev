const Validator = require("validator");
const _ = require("lodash");
const Profile = require("../models/Profile");

exports.createProfile = async (req, res, next) => {
    let { handle, status, skills } = req.body;
    handle = _.isEmpty(handle) ? "" : handle;
    status = _.isEmpty(status) ? "" : status;
    skills = _.isEmpty(skills) ? "" : skills;

    const errors = {};

    if (req.body.website) {
        website = req.body.website;
        if (!Validator.isURL(req.body.website))
            errors.website = "enter correct URL";
    }
    if (req.body.youtube) {
        youtube = req.body.youtube;
        if (!Validator.isURL(req.body.youtube))
            errors.youtube = "enter correct URL";
    }
    if (req.body.twitter) {
        twitter = req.body.twitter;
        if (!Validator.isURL(req.body.twitter))
            errors.twitter = "enter correct URL";
    }
    if (req.body.instagram) {
        instagram = req.body.instagram;
        if (!Validator.isURL(req.body.instagram))
            errors.instagram = "enter correct URL";
    }
    if (req.body.facebook) {
        facebook = req.body.facebook;
        if (!Validator.isURL(req.body.facebook))
            errors.facebook = "enter correct URL";
    }
    if (req.body.linkedIn) {
        linkedIn = req.body.linkedIn;
        if (!Validator.isURL(req.body.linkedIn))
            errors.linkedIn = "enter correct URL";
    }

    // handle

    if (_.isEmpty(handle.trim())) errors.handle = "handle should not be empty";
    const profileWithExistingHandle = await Profile.findOne({
        handle: handle,
    });
    if (profileWithExistingHandle) {
        if (profileWithExistingHandle.user != req.user.id)
            errors.handle = "handle already exists";
    }
    // status

    if (_.isEmpty(status)) errors.status = "status should not be empty";

    // skills

    if (Validator.isEmpty(skills)) errors.skills = "skills are mandatory";

    if (_.isEmpty(errors)) {
        next();
    } else {
        res.status(400).json({ errors });
    }
};
