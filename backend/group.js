const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter group name'],
    trim: true,
    maxLength: [50, 'Group name cannot exceed 50 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter group description'],
  },
  // students:[{type:ObjectId,ref:"Student"}],

  students: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
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

module.exports = mongoose.model('Group', groupSchema);
