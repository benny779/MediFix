const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  number: { type: Number, required: true },
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
