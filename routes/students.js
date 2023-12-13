const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt');
const roles = require('../config/roles');

const studentRegController = require('../controllers/studentRegController');

router.route('/')
    .get(studentRegController.getAllStudents)
    .post(studentRegController.regNewStudent)
    .put(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.updateStudent)
router.route('/:id')
    .delete(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.deleteStudent)

    .get(studentRegController.getOneStudent);


module.exports = router