const express = require('express')
const router = express.Router();


const {
    sendExpression,
    startExpression,
    getExpressionSessionStudent


} = require('../controllers/expressionController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/sessioncour/sendexpression').put(isAuthenticatedUser, authorizeRoles('user'), sendExpression);
router.route('/startexpression/:id').get(isAuthenticatedUser, authorizeRoles('user'), startExpression);
router.route('/expressionsessionstudent/:id/:studentid').get(isAuthenticatedUser, authorizeRoles('teacher','admin'),getExpressionSessionStudent);




module.exports = router;