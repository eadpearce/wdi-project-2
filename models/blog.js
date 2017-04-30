const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
