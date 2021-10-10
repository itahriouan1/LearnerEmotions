const express = require('express')
const router = express.Router();


const {
    sendExpression,
    startExpression

} = require('../controllers/expressionController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/sessioncour/sendexpression').put(isAuthenticatedUser, authorizeRoles('user'), sendExpression);
router.route('/startexpression/:id').get(isAuthenticatedUser, authorizeRoles('user'), startExpression);


module.exports = router;