const express = require('express')
const router = express.Router();


const {
  naturesessioncoureDtails,

} = require('../controllers/naturesessioncourContoller')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//Teacher & Admin Route
router.route('/naturesessioncour/:id').get(isAuthenticatedUser, authorizeRoles('teacher','admin'), naturesessioncoureDtails)


module.exports = router;