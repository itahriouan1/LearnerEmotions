const Group = require('../models/group')
const NatureSessioncour = require('../models/natureSessioncour')
const User = require('../models/user')
const Sessioncour = require('../models/sessioncour')
const Naturesessioncour = require('../models/natureSessioncour')



const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

const mongoose = require('mongoose');
const sessioncour = require('../models/sessioncour');
mongoose.set('useFindAndModify', false);

// Get naturesessioncoureDtails  =>   /api/v1/naturesessioncouretails/:id
exports.naturesessioncoureDtails = catchAsyncErrors(async (req, res, next) => {
  console.log("req.params.id")
  console.log(req.params.id)
  const naturesessioncour = await NatureSessioncour.find({ _id: req.params.id });

  res.status(200).json({
      success: true,
      naturesessioncour
  })

})