const express = require('express');
const router = express.Router();
const GroupController = require('../Controller/GroupController');
const checkToken = require('../middlewares/checkToken');
const checkAdmin = require('../middlewares/checkAdmin');

//[path: group/]
router.get(
    '/', 
    checkToken,
    checkAdmin,
    GroupController.getAll
);

module.exports = router;