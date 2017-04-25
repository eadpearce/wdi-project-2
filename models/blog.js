const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile' },
  author: { type: String },
  comments: [{
    body: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }]
}, { timestamps: true });


const blogSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile', required: true },
  posts: [ postSchema ]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
