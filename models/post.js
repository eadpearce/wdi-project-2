const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  ownerName: { type: String, required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile', required: true },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true },
  author: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
