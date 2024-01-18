const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  number: { type: String, required: true },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
