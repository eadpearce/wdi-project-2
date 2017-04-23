const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  alts: [{ type: String, default: '' }],
  main: { type: String, default: '' },
  age: { type: Number, default: null },
  about: { type: String, default: '' }
});

module.exports = mongoose.model('Profile', profileSchema);
