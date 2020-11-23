const express = require("express");
const postValidator = require("../validations/postValidator");
const passport = require("passport");
const postController = require("../controllers/postController");
const router = express.Router();
// @route  GET /api/posts/test
// @access public
// @desc   this is posts/test route
router.get("/test", (req, res) =>
    res.json({ msg: "this is posts" }).status(200)
);

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    postValidator.postValidator,
    postController.createPost
);

router.get(
    "/my-posts",
    passport.authenticate("jwt", { session: false }),
    postController.getMyPost
);
router.get("/all", postController.getAllPosts);

router.get("/:postId", postController.getPost);

router.post(
    "/like/:postId",
    passport.authenticate("jwt", { session: false }),
    postController.toggleLike
);

router.delete(
    "/:postId",
    passport.authenticate("jwt", { session: false }),
    postController.deletePost
);

router.post(
    "/comment/:postId",
    passport.authenticate("jwt", { session: false }),
    postValidator.postValidator,
    postController.createComment
);

router.delete(
    "/comment/:postId/:commentId",
    passport.authenticate("jwt", { session: false }),
    postController.deleteComment
);
module.exports = router;
