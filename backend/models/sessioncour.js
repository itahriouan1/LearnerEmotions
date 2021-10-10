const mongoose = require('mongoose');

const sessioncourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter session name'],
    trim: true,
    maxLength: [50, 'Session name cannot exceed 50 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter session description'],
  },
  natureSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'Naturesessioncour',
    required: true,
  },
  status:{
    type: Number,
    default: 0,
  },
  groups: [
    {
      group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        required: true,
      }
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sessioncour', sessioncourSchema);
