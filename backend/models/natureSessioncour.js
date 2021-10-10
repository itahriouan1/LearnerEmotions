const mongoose = require('mongoose');

const naturesessioncourSchema = new mongoose.Schema({
  natureSession: {
    type: String,
    required: [true, 'Please select nature for this session'],
    enum: {
      values: [
        'Cour',
        'Td',
        'Tp',
        'Exame',
      ],
      message: 'Please select correct nature for session',
    },
  },
  sessioncour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sessioncour',
    required: false,
  },

})

module.exports = mongoose.model('Naturesessioncour', naturesessioncourSchema);