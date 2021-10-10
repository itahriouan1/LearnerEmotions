const mongoose = require('mongoose');

const expressionSchema = new mongoose.Schema({
  surprised:{
    type: Number,
    required:false
  },
  disgusted:{
    type: Number,
    required:false
  },
  fearful:{
    type: Number,
    required:false
  },
  sad:{
    type: Number,
    required:false
  },
  angry:{
    type: Number,
    required:false
  },
  happy:{
    type: Number,
    required:false
  },
  neutral:{
    type: Number,
    required:false
  },
  dateTimeStartRecording:{
    type: Date, 
    default: Date.now
  },
  dateTimeStopRecording:{
    type: Date,
    required:false
  },
  natureSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'Naturesessioncour',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  sessioncour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sessioncour',
    required: true,
  },
});

module.exports = mongoose.model('Expression', expressionSchema);
