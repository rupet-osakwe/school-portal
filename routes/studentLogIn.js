
const express = require('express');
const router = express.Router();

const authController = require('../controllers/studentAuth');
router.route('/')
    .post(authController.studentAuth);


module.exports = router;
