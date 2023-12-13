
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/viewAdmin');
router.route('/')
    .post(adminController.createAdmin)
    .get(adminController.getAdmin);


module.exports = router;