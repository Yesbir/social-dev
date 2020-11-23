const Profile = require("../models/Profile");
const _ = require("lodash");

// delete Profile

exports.deleteProfile = async (req, res) => {
    const user = req.user.id;
    try {
        const profile = await Profile.findOneAndRemove({ user });
        if (profile) res.status(200).json({ deleted: profile });
        else {
            res.status(400).json({ error: "profile not found" });
        }
        res.status(400).json({
            error: "Profile does not exist first create profile",
        });
    } catch (err) {
        res.status(400).json({
            error: "something is wrong Profile is not deleted try again",
            err,
        });
    }
};

// delete education

exports.deleteEducation = async (req, res) => {
    const eduId = req.params.eduId;
    const user = req.user.id;
    try {
        const profile = await Profile.findOne({ user });
        if (profile) {
            const index = profile.education.map((edu) => edu.id).indexOf(eduId);
            const deletedEducation = profile.education[index];
            profile.education.splice(index, 1);
            await profile.save();

            res.status(200).json({ deleted: deletedEducation });
        }
        res.status(400).json({
            error: "Profile does not exist first create profile",
        });
    } catch (err) {
        res.status(400).json({
            error: "something is wrong Education is not deleted try again",
            err,
        });
    }
};

//delete Experience

exports.deleteExperience = async (req, res) => {
    const expId = req.params.expId;
    const user = req.user.id;
    try {
        const profile = await Profile.findOne({ user });
        if (profile) {
            const index = profile.experience
                .map((exp) => exp.id)
                .indexOf(expId);
            const deletedExperience = profile.experience[index];
            profile.experience.splice(index, 1);
            await profile.save();

            res.status(200).json({ deleted: deletedExperience });
        }
    } catch (err) {
        res.status(400).json({
            error: "something is wrong experience is not deleted try again",
            err,
        });
    }
};

// add Education to profile
exports.addEducation = async (req, res) => {
    const education = {};
    if (req.body.degree) education.degree = req.body.degree;
    if (req.body.institute) education.institute = req.body.institute;
    if (req.body.fieldOfStudy) education.fieldOfStudy = req.body.fieldOfStudy;
    if (req.body.from) education.from = req.body.from;
    if (req.body.to) education.to = req.body.to;
    if (req.body.current) education.current = req.body.current;
    if (req.body.description) education.description = req.body.description;

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // console.log(profile);
            profile.education.unshift(education);
            try {
                await profile.save();
                return res.json({ education });
            } catch (err) {
                return res.status(400).json({
                    error: "Something is wrong not able to save education",
                });
            }
        }
        return res.status(400).json({
            error: "Profile does not exist first create profile",
        });
    } catch (err) {
        return res.status(404).json({ error: "profile not found" });
    }
};

// add experience to the profile

exports.addExperience = async (req, res) => {
    const experience = {};
    if (req.body.title) experience.title = req.body.title;
    if (req.body.company) experience.company = req.body.company;
    if (req.body.location) experience.location = req.body.location;
    if (req.body.from) experience.from = req.body.from;
    if (req.body.to) experience.to = req.body.to;
    if (req.body.current) experience.current = req.body.current;
    if (req.body.description) experience.description = req.body.description;

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile.experience.unshift(experience);
            try {
                await profile.save();
                res.json({ experience: profile.experience[0] });
            } catch (err) {
                res.status(400).json({
                    error: "Something is wrong not able to save experience",
                });
            }
        }
        res.status(400).json({
            error: "Profile does not exist first create profile",
        });
    } catch (err) {
        res.status(404).json({ error: "profile not found" });
    }
};

// get all the profiles

exports.getAll = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", [
            "name",
            "avatar",
        ]);
        if (profiles) {
            // console.log(profiles);
            return res.json({ profiles });
        }
    } catch (err) {
        return res.status(400).json({ profile: "dont have profiles" });
    }
};

// get the user by userId

exports.getProfileByUserId = async (req, res) => {
    const id = req.params.userId;
    // console.log(id);
    errors = {};
    try {
        const profile = await Profile.findOne({ user: id })
            .populate("user", ["name", "avatar"])
            .exec();
        if (profile) res.json(profile);
        else {
            errors.profile = "the Profile for user does not exist";
            res.status(404).json({ errors });
        }
    } catch (err) {
        res.status(404).json({ error: "the user does not exist" });
    }
};

// get the user by its handle

exports.getProfileByHandle = async (req, res) => {
    const handle = req.params.handle;
    // console.log(handle);
    errors = {};
    try {
        const profile = await Profile.findOne({ handle })
            .populate("user", ["name", "avatar"])
            .exec();
        if (profile) res.json(profile);
        else {
            errors.profile = "the Profile for user does not exist";
            res.status(404).json({ errors });
        }
    } catch (err) {
        res.status(404).json({ error: "the user does not exist" });
    }
};

// get logedIn user profile

exports.getProfile = async (req, res) => {
    console.log("get user profile");
    const id = req.user.id;
    const errors = {};
    const profile = await Profile.findOne({ user: id }).populate("user", [
        "name",
        "avatar",
    ]);
    if (profile) {
        res.json({ profile });
    } else {
        errors.profile = "profile doesnot exist";
        res.status(404).json({ errors });
    }
};

exports.createProfile = async (req, res) => {
    const errors = {};
    const profileFields = {};
    if (req.user.id) {
        profileFields.user = req.user.id;
    }
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubUsername)
        profileFields.githubUsername = req.body.githubUsername;
    // skills
    profileFields.skills = [];
    if (req.body.skills) profileFields.skills = req.body.skills.split(",");

    // social
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;

    const profile = await Profile.findOne({
        user: profileFields.user,
    });

    if (profile) {
        // update
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        ).exec();

        res.json({ updatedProfile });
    } else {
        const profileWithExistingHandle = await Profile.findOne({
            handle: profileFields.handle,
        });

        const newProfile = await new Profile(profileFields).save();
        res.json({ profile: newProfile });
    }
};
