const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJwt')
const roles = require('../config/roles')

const resultController = require('../controllers/resultController');

router.route('/')
    .get(resultController.getAllResults)
    .post(verifyJWT, verifyAccess(roles.Staff, roles.Admin), resultController.regNewResult)
    .put(verifyJWT, verifyAccess(roles.Staff, roles.Admin), resultController.updateResult)
    .delete(verifyJWT, verifyAccess(roles.Staff, roles.Admin), resultController.deleteResult)
router.route('/:id')
    .get(resultController.getOneResult);


module.exports = router