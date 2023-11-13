
const express = require('express');
const router = express.Router();

const authController = require('../controllers/studentAuth');
router.route('/studentLogin')
    .post(authController.studentAuth);


module.exports = router;
