const mongoose = require('mongoose');

const labResultSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const LabResult = mongoose.model('LabResult', labResultSchema);

module.exports = { LabResult };

