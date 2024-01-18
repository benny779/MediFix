const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
