const express = require('express')
const router = express.Router();


const {
    sendExpression,
    startExpression,
    getExpressionSessionStudent


} = require('../controllers/expressionController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/sessioncour/sendexpression').put(isAuthenticatedUser, authorizeRoles('student'), sendExpression);
router.route('/startexpression/:id').get(isAuthenticatedUser, authorizeRoles('student'), startExpression);
router.route('/expressionsessionstudent/:id/:studentid').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),getExpressionSessionStudent);




module.exports = router;