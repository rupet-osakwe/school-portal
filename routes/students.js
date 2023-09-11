const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt');
const roles = require('../config/roles');

const studentRegController = require('../controllers/studentRegController');

router.route('/')
    .get(studentRegController.getAllStudents)
    .post(verifyJWT, verifyAccess(roles.Admin), studentRegController.regNewStudent)//roles.Student, roles.Admin, roles.Staff
    .put(verifyAccess(roles.Staff || roles.Admin || roles.Staff), studentRegController.updateStudent)
    .delete(verifyAccess(roles.Staff, roles.Admin || roles.Staff), studentRegController.deleteStudent)
router.route('/:id')
    .get(studentRegController.getOneStudent);


module.exports = router