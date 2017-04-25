const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
