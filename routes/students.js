const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const roles = require('../config/roles');

const studentRegController = require('../controllers/studentRegController');

router.route('/')
    .get(studentRegController.getAllStudents)
    .post(verifyAccess(roles.Student || roles.Admin || roles.Staff), studentRegController.regNewStudent)
    .put(verifyAccess(roles.Staff || roles.Admin || roles.Staff), studentRegController.updateStudent)
    .delete(verifyAccess(roles.Staff, roles.Admin || roles.Staff), studentRegController.deleteStudent)
router.route('/:id')
    .get(studentRegController.getOneStudent);


module.exports = router