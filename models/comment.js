const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  author: { type: String, required: true },
  parentPost: { type: mongoose.Schema.ObjectId, ref: 'Post', required: true },
  parentBlog: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true },
  parentComment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
  replyLevel: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
