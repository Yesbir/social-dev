const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    text: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    name: {
        type: String,
    },
    likes: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    comments: [this],
});

module.exports = mongoose.model("post", PostSchema);
