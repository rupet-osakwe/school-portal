const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJwt');
const verifyAccess = require('../middleware/verifyRoles');
const roles = require('../config/roles');

const staffController = require('../controllers/staffController');

router.route('/')
    .get(verifyJWT, verifyAccess(roles.Staff, roles.Student), staffController.getAllStaffs)
    .post(verifyJWT, verifyAccess(roles.Admin), staffController.regNewStaff)
    .put(verifyJWT, verifyAccess(roles.Admin), staffController.updateStaff)
    .delete(verifyJWT, verifyAccess(roles.Admin), staffController.deleteStaff)
router.route('/:id')
    .get(verifyJWT, verifyAccess(roles.Staff, roles.Student), staffController.getOneStaff);


module.exports = router