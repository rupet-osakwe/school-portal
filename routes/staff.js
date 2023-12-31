const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJwt');
const verifyAccess = require('../middleware/verifyRoles');
const roles = require('../config/roles');

const staffController = require('../controllers/staffController');

router.route('/')
    .get(verifyJWT, verifyAccess(roles.Staff, roles.Student, roles.Admin), staffController.getAllStaffs)
    .post(verifyJWT, verifyAccess(roles.Admin), staffController.regNewStaff)
    .put(verifyJWT, verifyAccess(roles.Admin), staffController.updateStaff)
router.route('/:id')
    .delete(verifyJWT, verifyAccess(roles.Admin), staffController.deleteStaff)

    .get(verifyJWT, verifyAccess(roles.Staff, roles.Student, roles.Admin), staffController.getOneStaff);


module.exports = router