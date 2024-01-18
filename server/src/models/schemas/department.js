const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  floorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', required: true },
  name: { type: String, required: true },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
