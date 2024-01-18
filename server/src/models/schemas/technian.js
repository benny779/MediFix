const mongoose = require('mongoose');
const personSchema = require('./personSchema');

const technianSchema = new mongoose.Schema({
  ...personSchema,
  expertise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expertise' }],
  workingHours: [
    {
      day: { type: Number, min: 1, max: 7, required: true },
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  ],
});

const Technian = mongoose.model('User', technianSchema);

module.exports = Technian;
