const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt');
const roles = require('../config/roles');

const studentRegController = require('../controllers/studentRegController');

router.route('/studentBase')
    .get(studentRegController.getAllStudents)
    .post(verifyJWT, verifyAccess(roles.Admin, roles.Staff, roles.Student), studentRegController.regNewStudent)
    .put(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.updateStudent)
router.route('/studentBase:id')
    .delete(verifyJWT, verifyAccess(roles.Staff, roles.Admin), studentRegController.deleteStudent)

    .get(studentRegController.getOneStudent);


module.exports = router