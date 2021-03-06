const Post = require("../models/Post");
const _ = require("lodash");

exports.createPost = async (req, res) => {
  const postData = {};

  postData.user = req.user.id;
  postData.avatar = req.user.avatar;
  postData.name = req.user.name;
  postData.text = req.body.text;
  // console.log(postData);
  try {
    const post = await new Post(postData).save();
    // console.log(post);
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ error: "Something is wrong", err });
  }
};

exports.getMyPost = async (req, res) => {
  const id = req.user.id;
  try {
    const myPosts = await Post.find({ user: id }).sort({ date: -1 });
    // console.log(post);
    return res.json({ myPosts });
  } catch (err) {
    return res.status(500).json({ error: "Something is wrong", err });
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.postId;
  try {
    const post = await Post.findOne({ _id: id });
    // console.log(post);
    if (post) return res.json({ post });
    res.status(404).json({ user: "user not found" });
  } catch (err) {
    return res.status(500).json({ error: "Something is wrong", err });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    // console.log(post);
    if (posts) return res.json({ posts });
    return res.status(404).json({ posts: "there are no post" });
  } catch (err) {
    return res.status(500).json({ error: "Something is wrong", err });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user.id;
  try {
    const post = await Post.findOne({ _id: postId });
    // console.log(post, postId);
    if (post.user == user) {
      await Post.findOneAndRemove({ _id: postId });
      if (post) return res.json({ deletedPost: post });
      else return res.json({ post: "post does not exist" });
    } else {
      return res.status(401).json({ deletePost: " not authorized" });
    }
  } catch (err) {
    res.status(400).json({ post: "post is not deleted " });
  }
};

exports.toggleLike = async (req, res) => {
  const id = req.user.id;
  const postId = req.params.postId;
  let isLike = false;

  try {
    const post = await Post.findOne({ _id: postId });
    if (post) {
      const index = post.likes.indexOf(id);
      if (index == -1) {
        post.likes.push(id);
        isLike = true;
      } else {
        post.likes.splice(index, 1);
        isLike = false;
      }
      await post.save();
      return res.json({ like: isLike });
    } else {
      return res.status(404).json({ post: "post does not exists" });
    }
  } catch (err) {
    return res.status(400).json({ post: "Bad request" });
  }
};

exports.createComment = async (req, res) => {
  const commentData = {};
  const postId = req.params.postId;

  commentData.user = req.user.id;
  commentData.avatar = req.user.avatar;
  commentData.name = req.user.name;
  commentData.text = req.body.text;
  // console.log(commentData);
  try {
    const comment = new Post(commentData);
    const post = await Post.findOne({ _id: postId });
    // console.log(post);
    post.comments.unshift(comment);
    await post.save();
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ error: "Something is wrong", err });
  }
};

exports.deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const user = req.user.id;
  try {
    const post = await Post.findOne({ _id: postId });
    if (post) {
      const requiredComment = post.comments.filter(
        (comment) => comment._id == commentId
      );
      if (!_.isEmpty(requiredComment)) {
        if (requiredComment[0].user == user) {
          const index = post.comments
            .map((comment) => comment.id)
            .indexOf(commentId);
          post.comments.splice(index, 1);
          const updatedPost = await post.save();
          return res.json({ updatedPost });
        } else return res.status(401).json({ message: "Authorization error" });
      } else {
        return res.status(404).json({ message: "Comment does not exist" });
      }
    } else {
      return res.status(404).json({ post: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: " Something is wrong" });
  }
};
