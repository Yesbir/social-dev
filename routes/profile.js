const express = require("express");
const passport = require("passport");

const profileController = require("../controllers/profileController");
const profileValidator = require("../validations/profileValidator");
const experienceValidator = require("../validations/experienceValidator");
const educationValidator = require("../validations/educationValidator");

const router = express.Router();
// @route  GET /api/profile/test
// @access public
// @desc   this is profile/test route
router.get("/test", (req, res) => res.json({ msg: "this is profile" }));

router.get("/handle/:handle", profileController.getProfileByHandle);

router.get("/user/:userId", profileController.getProfileByUserId);

router.get("/all", profileController.getAll);

router.post(
    "/add-education",
    passport.authenticate("jwt", { session: false }),
    educationValidator.education,
    profileController.addEducation
);

router.post(
    "/add-experience",
    passport.authenticate("jwt", { session: false }),
    experienceValidator.experience,
    profileController.addExperience
);

router.delete(
    "/experience/:expId",
    passport.authenticate("jwt", { session: false }),
    profileController.deleteExperience
);

router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    profileController.deleteProfile
);

router.delete(
    "/education/:eduId",
    passport.authenticate("jwt", { session: false }),
    profileController.deleteEducation
);

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    profileController.getProfile
);
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    profileValidator.createProfile,
    profileController.createProfile
);

module.exports = router;
