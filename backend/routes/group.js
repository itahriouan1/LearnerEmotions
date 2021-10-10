const express = require('express')
const router = express.Router();


const {
    newGroup,
    getAllGroups,
    myGroupsCreated,
    groupsIBelongTo,
    updateGroup,
    deleteGroup,
    getSingleGroup,
    groupCreateStudent,
    groupAddStudent,
    groupDeleteStudent,
    getUsersGroup

} = require('../controllers/groupController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//Teacher & Admin Route
router.route('/group/new').post(isAuthenticatedUser, authorizeRoles('teacher','admin'), newGroup);
router.route('/mygroupscreated').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),myGroupsCreated);
router.route('/group/:id')
    .put(isAuthenticatedUser, authorizeRoles('teacher','admin'), updateGroup)
    .delete(isAuthenticatedUser, authorizeRoles('teacher','admin'), deleteGroup)
    .get(isAuthenticatedUser, authorizeRoles('teacher','admin'), getSingleGroup);
router.route('/usersgroup/:id').get(isAuthenticatedUser, authorizeRoles('teacher','admin'), getUsersGroup)
router.route('/group/createstudents/:id').put(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupCreateStudent)
router.route('/group/addstudents/:id').put(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupAddStudent)
router.route('/group/deletestudent').delete(isAuthenticatedUser, authorizeRoles('teacher','admin'), groupDeleteStudent)

//Admin Route
router.route('/admin/groups').get(isAuthenticatedUser, authorizeRoles('admin'),getAllGroups);


//Teacher Route


// user route
router.route('/groupsibelongto').get(isAuthenticatedUser, authorizeRoles('user'),groupsIBelongTo);



// router.route('/review').put(isAuthenticatedUser, createProductReview)
// router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
// router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;