const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Expertise = mongoose.model('Expertise', expertiseSchema);

module.exports = Expertise;
