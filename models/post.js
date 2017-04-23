const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true, unique: true },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog' },
  author: { type: String },
  comments: [{
    body: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
