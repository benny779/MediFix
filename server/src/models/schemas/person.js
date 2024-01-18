const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = personSchema;
