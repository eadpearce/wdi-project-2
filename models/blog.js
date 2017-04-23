const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  posts: [ { type: mongoose.Schema.ObjectId, ref: 'Post', default: null } ]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
