const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
    floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
