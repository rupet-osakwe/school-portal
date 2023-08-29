
const express = require('express');
const router = express.Router();
const verifiedRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt');
const roles = require('../config/roles');

const staffLogIn = require('../controllers/staffAuth');
router.route('/')
    .post(staffLogIn.staffActive);


module.exports = router;