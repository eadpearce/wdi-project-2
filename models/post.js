const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile' },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog' },
  author: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
