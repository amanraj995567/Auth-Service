const express = require('express');
const UserConroller = require('../../controllers/user-controllers');
const router = express.Router();


router.post('/signup', UserConroller.create);

module.exports = router;

