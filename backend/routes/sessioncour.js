const express = require('express')
const router = express.Router();


const {
    newSessioncour,
    getAllSessionCours,
    mySessioncoursCreated,
    activeSessioncoursOfAGroup,
    deleteSessioncour,
    getSessioncoursGroup,
    updateSessioncourStatus,
    sessioncoursAvailable,
    sessioncoursHistory,
    getInfoSessioncourStudent,
    sessioncoursNoActiveStudentTeacher,    

} = require('../controllers/sessioncourController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//Teacher & Admin Route
router.route('/sessioncour/new').post(isAuthenticatedUser, authorizeRoles('teacher','admin'), newSessioncour);
router.route('/mysessioncourscreated').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),mySessioncoursCreated);
router.route('/deletesessioncour')
    .delete(isAuthenticatedUser, authorizeRoles('teacher','admin'), deleteSessioncour)
router.route('/updatsessioncourstatus/:id')
    .put(isAuthenticatedUser, authorizeRoles('teacher','admin'), updateSessioncourStatus)
//     .put(isAuthenticatedUser, authorizeRoles('teacher','admin'), updateGroup)
//     .get(isAuthenticatedUser, authorizeRoles('teacher','admin'), getSingleGroup);
// router.route('/group/createstudents/:id').put(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupCreateStudent)
// router.route('/group/addstudents/:id').put(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupAddStudent)
// router.route('/group/deletestudent').delete(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupDeleteStudent)

//Admin Route
router.route('/admin/sessiongroup').get(isAuthenticatedUser, authorizeRoles('admin'),getAllSessionCours);


//Teacher Route


// user route
router.route('/groupactivesessioncour').get(isAuthenticatedUser, authorizeRoles('user','admin'), activeSessioncoursOfAGroup);
router.route('/availablesessioncours').get(isAuthenticatedUser, authorizeRoles('user'),sessioncoursAvailable);
router.route('/historysessioncours').get(isAuthenticatedUser, authorizeRoles('user'),sessioncoursHistory);
router.route('/sessioncoursgroup/:id').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),getSessioncoursGroup);
router.route('/infosessioncourstudent/:id').get(isAuthenticatedUser, authorizeRoles('user','teacher','admin'),getInfoSessioncourStudent);
router.route('/sessionnoactivestudentteacher/:id').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),sessioncoursNoActiveStudentTeacher);




// router.route('/review').put(isAuthenticatedUser, createProductReview)
// router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
// router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;