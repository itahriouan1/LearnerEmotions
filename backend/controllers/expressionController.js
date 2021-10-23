const Group = require('../models/group')
const User = require('../models/user')
const Expression = require('../models/expression')
const Sessioncour = require('../models/sessioncour')
const NatureSessioncour = require('../models/natureSessioncour')


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

const mongoose = require('mongoose');
const read = require('body-parser/lib/read');
mongoose.set('useFindAndModify', false);


// Send Expression of user   =>   /api/v1/sessioncour/sendexpression
exports.sendExpression = catchAsyncErrors(async (req, res, next) => {

  console.log(req.body)
  // check if session stile active or not
  const sessioncour = await Sessioncour.find({_id:req.body.sessioncour})
  let sessioncourstatus = 0
  if(!sessioncour){
    return next(new ErrorHandler('session not found', 404));
    console.log('0')

  }else{
    sessioncourstatus = sessioncour.status
    req.body.natureSession = sessioncour[0].natureSession

  }
  req.body.user = req.user.id;
  const expression = await Expression.find({natureSession : req.body.natureSession,sessioncour:req.body.sessioncour})
  if (expression.length == 0) {
    expression = await Expression.create(req.body);
  }else{
    neutral =req.body.neutral + expression[0].neutral
    happy = req.body.happy + expression[0].happy
    sad = req.body.sad + expression[0].sad
    angry = req.body.angry + expression[0].angry
    fearful = req.body.fearful + expression[0].fearful
    disgusted =req.body.disgusted + expression[0].disgusted
    surprised =req.body.surprised + expression[0].surprised

    await Expression.findByIdAndUpdate(expression[0]._id, {
      neutral,
      happy,
      sad,
      angry,
      fearful,
      disgusted,
      surprised
    },{
      new: true,
    });
    
  }

  res.status(201).json({
    success: true,
    sessioncourstatus,
    expression
  })
  })

  
// Start Expression of user   =>   /api/v1/startexpression
exports.startExpression = catchAsyncErrors(async (req, res, next) => {

  let success = false
  // const expression = await Expression.find({sessioncour: req.params.id, user: req.user.id, dateTimeStopRecording: null})
  const expressions = await Expression.find({user: req.user.id, dateTimeStopRecording: null})
  if (expressions.length >0) {
    expressions.map(expression => (
      ( expression.sessioncour === req.params.id) && (success = true) 

    ))
  }
  
  // if(!success)
  //   return next(new ErrorHandler(`You must stop all sessions open to start it ${expression} `, 404));

  res.status(201).json({
    success: success
  })

})

// Get Expression of student   =>   /api/v1/expressionsessionstudent
exports.getExpressionSessionStudent = catchAsyncErrors(async (req, res, next) => {
  
  const sessioncour = await Sessioncour.find({_id : req.params.id});
  if(!sessioncour){
    return next(new ErrorHandler('Session not found', 404));

  }

  let expression = null
  console.log(req.params.id)
  console.log(req.params.studentid)
  expression = await Expression.find({user: req.params.studentid, sessioncour: req.params.id})
  console.log(expression)

  res.status(200).json({
      sessioncour,
      expression
  })

})
  
