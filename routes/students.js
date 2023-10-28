const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt');
const roles = require('../config/roles');

const studentRegController = require('../controllers/studentRegController');

router.route('/')
    .get(studentRegController.getAllStudents)
    .post(verifyJWT, verifyAccess(roles.Admin, roles.Staff, roles.Student), studentRegController.regNewStudent)
    .put(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.updateStudent)
    .delete(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.deleteStudent)
router.route('/:id')
    .get(studentRegController.getOneStudent);


module.exports = router