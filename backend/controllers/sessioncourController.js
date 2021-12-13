const Group = require('../models/group')
const User = require('../models/user')
const Sessioncour = require('../models/sessioncour')
const Naturesessioncour = require('../models/natureSessioncour')
const Expression = require('../models/expression')




const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

const mongoose = require('mongoose');
const sessioncour = require('../models/sessioncour');
mongoose.set('useFindAndModify', false);


// Create new sessioncour   =>   /api/v1/sessioncour/new
exports.newSessioncour = catchAsyncErrors(async (req, res, next) => {

  req.body.createdBy = req.user.id;
  let groups = req.body.groups
  req.body.groups = []
  // console.log(req.body)
  // console.log(groups)
  const natureSession = req.body.natureSession;
  // console.log("naturesession "+typeof natureSession)
  const naturesessioncour = await Naturesessioncour.create({natureSession})
  req.body.natureSession = naturesessioncour['_id']
  const thesessioncour = await Sessioncour.create(req.body);
  const sessioncour = thesessioncour['_id']

  natsSes = await Naturesessioncour.findByIdAndUpdate(naturesessioncour['_id'], {sessioncour}, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  const a = await Promise.all(groups.map( async (group) => (
    Group.find({ _id: group.group })
        .then(group => {
            if(Object.keys(group).length > 0){
                // check if !already exist in this session && add this group to sessioncour
                if(!(thesessioncour.groups.find(groupfind => groupfind._id.toString() === group[0]._id.toString()))){
                    Sessioncour.findByIdAndUpdate(sessioncour._id,{
                            $push:{groups:group}
                        },{ new:true}
                    ).exec((err,result)=>{
                        if(err){
                            console.log("errrr 1 : "+err)
                            // res.status(422).json({error:"findByIdAndUpdate err "+err})
                        }else{
                        }
                    })
                }

            }
        })
)))

  res.status(201).json({
    success: true,
    message:"nice"
  })
})

// Get all sessioncours   =>   /api/v1/admin/sessioncours
exports.getAllSessionCours = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const sessioncourCount = await Sessioncour.countDocuments();

  const apiFeatures = new APIFeatures(Sessioncour.find(), req.query)
    .search()
    .filter()

  let sessioncours = await apiFeatures.query;
  let filteredSessioncourCount = sessioncours.length;

  apiFeatures.pagination(resPerPage)
  sessioncours = await apiFeatures.query;


  res.status(200).json({
    success: true,
    sessioncourCount,
    resPerPage,
    filteredSessioncourCount,
    sessioncours
  })

  // const sessioncour = await Sessioncour.find();

  // res.status(200).json({
  //     success: true,
  //     count : sessioncour.length,
  //     sessioncour
  // })

})

// Get Info sessioncours   =>   /api/v1/infosessioncourstudent
exports.getInfoSessioncourStudent = catchAsyncErrors(async (req, res, next) => {
  
  const sessioncour = await Sessioncour.find({_id : req.params.id});
  if(!sessioncour){
    return next(new ErrorHandler('Session not found', 404));

  }

  let expression = null
  if(req.user.role !== 'user'){
    let allexpression = []
    let surprised = 0
    let disgusted = 0
    let fearful = 0
    let sad = 0
    let angry = 0
    let happy = 0
    let neutral = 0
    allexpression = await Expression.find({sessioncour:req.params.id})
    
    allexpression.forEach(exp => {
      surprised  += exp.surprised
      disgusted  += exp.disgusted
      fearful  += exp.fearful
      sad += exp.sad
      angry  += exp.angry
      happy  += exp.happy
      neutral  += exp.neutral
    })
    expression = [{
      'surprised'  : surprised,
      'disgusted'  : disgusted,
      'fearful'  : fearful,
      'sad' : sad,
      'angry'  : angry,
      'happy'  : happy,
      'neutral'  : neutral
    }]
  }else{
    expression = await Expression.find({user:req.user.id, sessioncour:req.params.id})

  }
  // expression = await Expression.find({user:req.user.id, sessioncour:req.params.id})
  console.log('expression  expression dddddd')
  console.log(expression)
  res.status(200).json({
      sessioncour,
      expression
  })

})


// Get Sessioncours of group    =>   /api/v1/sessioncourgroup/:id
exports.getSessioncoursGroup = catchAsyncErrors(async (req, res, next) => {

  const sessioncours = await Sessioncour.find({groups:{_id : req.params.id}})
  

  res.status(200).json({
      success: true,
      sessioncours
  })

})

// Get my sessioncours created  =>   /api/v1/mysessioncourscreated
exports.mySessioncoursCreated = catchAsyncErrors(async (req, res, next) => {

  const sessioncours = await Sessioncour.find({ createdBy: req.user.id });

  res.status(200).json({
      success: true,
      count : sessioncour.length,
      sessioncours
  })

})

// Get Active Sessioncours of a group  =>   /api/v1/groupsessioncour
exports.activeSessioncoursOfAGroup= catchAsyncErrors(async (req, res, next) => {
  // const resPerPage = 1;
  // const sessioncourCount = await Sessioncour.countDocuments({groups:{_id : req.body.idGroup},status:1});

  // const apiFeatures = new APIFeatures(Sessioncour.find({groups:{_id : req.body.idGroup},status:1}), req.query)
  //   .search()
  //   .filter()

  // let sessioncours = await apiFeatures.query;
  // let filteredSessioncourCount = sessioncours.length;

  // apiFeatures.pagination(resPerPage)
  // sessioncours = await apiFeatures.query;


  // res.status(200).json({
  //   success: true,
  //   sessioncourCount,
  //   resPerPage,
  //   filteredSessioncourCount,
  //   sessioncours
  // })

  const sessioncours = await Sessioncour.find({groups:{_id : req.body.idGroup},status:1});

  res.status(200).json({
      success: true,
      count : sessioncours.length,
      sessioncours
  })

})

// Get Available Sessioncours   =>   /api/v1/activesessioncour
exports.sessioncoursAvailable= catchAsyncErrors(async (req, res, next) => {

  let sessioncoursActive = []
  const groups = await Group.find({students:{_id : req.user.id}})
  const a = await Promise.all(groups.map(async (group)=>(
    await Sessioncour.find({groups:{_id : group._id},status:1})
    .then((sessioncour) => {
      if(Object.keys(sessioncour).length > 0){
        sessioncoursActive = sessioncoursActive.concat(sessioncour)
        // sessioncoursActive.push(sessioncour[0])
      }
    })

  )))
  console.log(sessioncour)

  // sessioncoursActive = await Sessioncour.find({status:1});
  res.status(200).json({
      success: true,
      count : sessioncoursActive.length,
      sessioncoursActive
  })

})

// Get Sessioncour No Active Student-Teacher   =>   /api/v1/sessionnoactivestudentteacher
exports.sessioncoursNoActiveStudentTeacher= catchAsyncErrors(async (req, res, next) => {

  let sessioncoursNoActiveStudentTeacher = []
  const groups = await Group.find({students:{_id : req.params.id}})
  const a = await Promise.all(groups.map(async (group)=>(
    await Sessioncour.find({groups:{_id : group._id},status:2,createdBy:req.user.id})
    .then((sessioncour) => {
      if(Object.keys(sessioncour).length > 0){
        sessioncoursNoActiveStudentTeacher = sessioncoursNoActiveStudentTeacher.concat(sessioncour)
        // sessioncoursNoActiveStudentTeacher.push(sessioncour[0])
      }
    })

  )))
  // sessioncoursActive = await Sessioncour.find({status:1});
  res.status(200).json({
      success: true,
      count : sessioncoursNoActiveStudentTeacher.length,
      sessioncoursNoActiveStudentTeacher
  })

})

// Get History Sessioncours   =>   /api/v1/historysessioncours
exports.sessioncoursHistory = catchAsyncErrors(async (req, res, next) => {

  let sessioncoursNoActive = []
  const groups = await Group.find({students:{_id : req.user.id}})
  console.log(groups)
  const a = await Promise.all(groups.map(async (group)=>(
    await Sessioncour.find({groups:{_id : group._id},status:2})
    .then((sessioncour) => {
      console.log(group)
      console.log(group._id)
      console.log(sessioncour)
      if(Object.keys(sessioncour).length > 0){
        sessioncour.map( s =>(
          sessioncoursNoActive.push(s)
        ))
        // sessioncoursNoActive.push(sessioncour[0])

      }
    })

  )))
  // sessioncoursActive = await Sessioncour.find({status:1});
  res.status(200).json({
      success: true,
      count : sessioncoursNoActive.length,
      sessioncoursNoActive
  })

})

// Get Ended Sessioncours of a group  =>   /api/v1/groupsessioncour
exports.endedSessioncoursOfAGroup= catchAsyncErrors(async (req, res, next) => {

  // hna khassni nchof historique dyalo wakha tkon session mazal masalat
  // mli ngqd model.Expression 3ad nkml
  const sessioncours = await Sessioncour.find({groups:{_id : req.body.idGroup},status:1});

  res.status(200).json({
      success: true,
      count : sessioncours.length,
      sessioncours
  })

})  

// Delete sessioncour   =>   /api/v1/deletesessioncour
exports.deleteSessioncour = catchAsyncErrors(async (req, res, next) => {
  // khassni nzid delete nature li tab3a lhad session
  // const sessioncour = await Sessioncour.find({_id : req.params.id,status:0});
  const expression = await Expression.find({sessioncour:req.params.id})
  if (expression.length > 0) {
    return next(new ErrorHandler('You cant delete this Sessioncour cz it have expression data', 404));
    // success = false
    // message="You cant delete this Sessioncour cz it have expression data"
  }else{
    const session = await Sessioncour.findById(req.params.id);
    await session.remove();
    // success =  true,
    // message = 'Sessioncour is deleted.'
    res.status(200).json({
      success: true,
      message: 'Sessioncour is deleted.'
  })
  }


  // res.status(200).json({
  //     success: success,
  //     message: message
  // })

})

// Update sessioncour  =>  /api/v1/updatesessioncour
// exports.deleteSessioncour = catchAsyncErrors(async (req, res, next) => {

//   // after creating Expression

//   res.status(200).json({
//       success: success,
//       message: message
//   })

// })


// Update Product   =>   /api/v1/admin/product/:id
exports.updateSessioncourStatus = catchAsyncErrors(async (req, res, next) => {

  const sessioncour = await Sessioncour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!sessioncour) {
      return next(new ErrorHandler('Sessioncour not found', 404));
  }

  res.status(200).json({
      success: true,
      sessioncour
  })

})