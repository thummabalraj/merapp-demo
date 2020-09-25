const mongoose = require("mongoose");

// DB Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

//Model
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;