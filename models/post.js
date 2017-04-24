const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true, unique: true },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true},
  author: { type: String, required: true },
  comments: [{
    body: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
