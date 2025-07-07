const express = require('express');
const UserConroller = require('../../controllers/user-controllers');
const {AuthRequestValidators} = require('../../middlewares/index')
const router = express.Router();


router.post(
    '/signup', 
    AuthRequestValidators.validateUserAuth,
    UserConroller.create);

router.post(
    '/signIn', 
    AuthRequestValidators.validateUserAuth,
    UserConroller.signIn);

router.get('/isAuthenticated',UserConroller.isAuthenticated)

router.get('/isAdmin' ,
    AuthRequestValidators.validateIsAdminRequest,
     UserConroller.isAdmin);

module.exports = router;

