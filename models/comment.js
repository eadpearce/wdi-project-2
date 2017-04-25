const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  parentBlog: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true },
  parentComment: { type: mongoose.Schema.ObjectId, ref: 'Comment' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
