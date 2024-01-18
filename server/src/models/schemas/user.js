const mongoose = require('mongoose');
const personSchema = require('./personSchema');

const userSchema = new mongoose.Schema({
  ...personSchema,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
