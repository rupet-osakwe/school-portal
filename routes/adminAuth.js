
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authAdmin');
router.route('/AdminLogin')
    .post(authController.adminActive);


module.exports = router;
