const Group = require('../models/group')
const User = require('../models/user');


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);


// Create new group   =>   /api/v1/group/new
exports.newGroup = catchAsyncErrors(async (req, res, next) => {

    const {typeadd,name,description,students} = req.body
    let group
    if(typeadd !== "addstudentsinexistegroup"){
        group = await Group.create({
            name,
            description,
            createdBy: req.user._id,
            createdAt: Date.now(),
        })
        console.log("1")
        console.log(group)
    }else{
        // const group = await Group.find({_id:req.body.idgroup})
        group = await Group.findById(req.body.idgroup);
        console.log("2")
        console.log(group)

    }

    if((typeadd === "addstudents" || typeadd === "addstudentsexcel" || typeadd === "addstudentsinexistegroup") ){
        let avatar = {
            public_id: 'DEFAULT_AVATAR',
            url: 'images/default_avatar.jpg',
        };
    
        const a = await Promise.all(students.map( async (student) => (
            User.find({ email: student.nom+"_"+student.prenom.substr(0, 3)+"@upf.ac.ma" })
                .then(user => {
                    if(Object.keys(user).length > 0){
                        //[To Do => check student if exist in group ]
                        // add this student to group
                        Group.findByIdAndUpdate(group._id,{
                                $push:{students:user}
                            },{ new:true}
                        ).exec((err,result)=>{
                            if(err){
                                console.log("errrr 1 : "+err)
                                // res.status(422).json({error:"findByIdAndUpdate err "+err})
                            }else{
                            }
                        })
                        
                    }else{
                        // create student and add hem to group
                        User.create({
                            name:student.prenom+" "+student.nom,
                            email:student.nom+"_"+student.prenom.substr(0, 3)+"@upf.ac.ma",
                            password:"Upf_"+new Date().getFullYear(),
                            avatar,
                        }).then( user => {
                            Group.findByIdAndUpdate(group._id,{
                                $push:{students:user}
                                },{ new:true,
                                }
                            ).exec((err,result)=>{
                                if(err){
                                    console.log("errrr 2 : "+ err)
                                    // res.status(422).json({error:"findByIdAndUpdate err "+err})
                                }else{
                                }
                            })
                        })
                    }
                })
        )))

    }


    res.status(201).json({
        success: true,
        group
    })
})

// Get all groups   =>   /api/v1/admin/groups
exports.getAllGroups = catchAsyncErrors(async (req, res, next) => {

    const groups = await Group.find();

    res.status(200).json({
        success: true,
        count : groups.length,
        groups
    })

})

// Get my groups created  =>   /api/v1/mygroupscreated
exports.myGroupsCreated = catchAsyncErrors(async (req, res, next) => {

    const groups = await Group.find({ createdBy: req.user.id });

    res.status(200).json({
        success: true,
        count : groups.length,
        groups
    })

})

// Get Groups I belong to  =>   /api/v1/groupsibelongto
exports.groupsIBelongTo= catchAsyncErrors(async (req, res, next) => {

    const groups = await Group.find({students:{_id : req.user.id}});
    
    res.status(200).json({
        success: true,
        count : groups.length,
        groups
    })

})

// Update Group   =>   /api/v1/group/:id
exports.updateGroup = catchAsyncErrors(async (req, res, next) => {

    const groups = await Group.find({ createdBy: req.user.id });

    let group = groups.find(group => group._id.toString() === req.params.id.toString());

    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }

    group = await Group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        group
    })

})

// Delete Group   =>   /api/v1/product/:id
exports.deleteGroup = catchAsyncErrors(async (req, res, next) => {

    const group = await Group.findById(req.params.id);

    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }

    await group.remove();

    res.status(200).json({
        success: true,
        message: 'Group is deleted.'
    })

})

// Get single group details   =>   /api/v1/group/:id
exports.getSingleGroup = catchAsyncErrors(async (req, res, next) => {

    const group = await Group.findById(req.params.id);

    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }

    res.status(200).json({
        success: true,
        group
    })

})

// Get users group    =>   /api/v1/usersgroup
exports.getUsersGroup = catchAsyncErrors(async (req, res, next) => {

    const group = await Group.findById(req.params.id);
    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }
    var listIdUsers = [];
    group.students.map((student)=>(
        listIdUsers.push(student)
    ))

    var users = [];
    const a = await Promise.all(listIdUsers.map( async (userId) => (
        User.find({ _id: userId._id })
            .then((user)=>{
                users.push(user[0])
            })
    )))

    res.status(200).json({
        success: true,
        users
    })

})

// Create student to group   =>   /api/v1/group/createstudents/:id
exports.groupCreateStudent = catchAsyncErrors(async (req, res, next) => {
    const {students} = req.body

    const groups = await Group.find({ createdBy: req.user.id });

    let group = groups.find(group => group._id.toString() === req.params.id.toString());

    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }

    let avatar = {
        public_id: 'DEFAULT_AVATAR',
        url: 'images/default_avatar.jpg',
    };

    const a = await Promise.all(students.map( async (student) => (
        User.find({ email: student.firstName+"_"+student.lastName.substr(0, 3)+"@upf.ac.ma" })
            .then(user => {
                if(Object.keys(user).length > 0){
                    // add this student to group
                    Group.findByIdAndUpdate(req.params.id,{
                            $push:{students:user}
                        },{ new:true}
                    ).exec((err,result)=>{
                        if(err){
                            console.log("errrr 1 : "+err)
                            // res.status(422).json({error:"findByIdAndUpdate err "+err})
                        }else{
                        }
                    })
                    
                }else{
                    // create student and add hem to group
                    User.create({
                        name:student.lastName+" "+student.firstName,
                        email:student.firstName+"_"+student.lastName.substr(0, 3)+"@upf.ac.ma",
                        password:"Upf_"+new Date().getFullYear(),
                        avatar,
                    }).then( user => {
                        Group.findByIdAndUpdate(req.params.id,{
                            $push:{students:user}
                            },{ new:true,
                            }
                        ).exec((err,result)=>{
                            if(err){
                                console.log("errrr 2 : "+ err)
                                // res.status(422).json({error:"findByIdAndUpdate err "+err})
                            }else{
                            }
                        })
                    })
                }
            })
    )))

    // group = groups.find(group => groupn._id.toString() === req.params.id.toString());

    res.status(200).json({
        success: true,
        group
    })

})

// Add student to group   =>   /api/v1/group/addstudents/:id
exports.groupAddStudent = catchAsyncErrors(async (req, res, next) => {
    const {students} = req.body

    const groups = await Group.find({ createdBy: req.user.id });

    let group = groups.find(group => group._id.toString() === req.params.id.toString());

    if (!group) {
        return next(new ErrorHandler('Group not found', 404));
    }

    let alreadyExist = false
    const a = await Promise.all(students.map( async (student) => (
        User.find({ email: student.email })
            .then(user => {
                if(Object.keys(user).length > 0){
                    // check if !already exist in this group && add this student to group
                    if(!(group.students.find(student => student._id.toString() === user[0]._id.toString()))){
                        Group.findByIdAndUpdate(req.params.id,{
                                $push:{students:user}
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

    res.status(200).json({
        success: true,
        group
    })

})



// Delete group Student   =>   /api/v1/group/deletestudent
exports.groupDeleteStudent = catchAsyncErrors(async (req, res, next) => {
    // is not working cz Cast to ObjectId failed for value "deletestudent" (type string) at path "_id" for model "Group"
    // const {students} = req.body
    // console.log("0")
    // const groups = await Group.find({ createdBy: req.user.id });
    // console.log("1")
    // let group = groups.find(group => group._id.toString() === req.query.groupId.toString());
    // console.log("2")
    // if (!group) {
    //     return next(new ErrorHandler('Group not found', 404));
    // }
    // console.log("3")
    // const students = group.students.filter(student => student._id.toString() !== req.query.id.toString());
    // console.log("4")
    // await Group.findByIdAndUpdate(req.query.groupId, {
    //     students
    // }, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false
    // })

    res.status(200).json({
        success: true
    })
})