const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController.js');
const checkToken = require('../middlewares/checkToken.js');
const checkManager = require('../middlewares/checkManager.js');
const handleExpiredContract = require('../middlewares/handleExpiredContract.js');
const checkAdmin = require('../middlewares/checkAdmin.js');

// [path: user/create]
router.post(
    '/create', 
    checkToken,
    checkAdmin,
    UserController.create
);

// [path: user/update]
router.put(
    '/update',
    checkToken, 
    UserController.update
);

// [path: user/delete/:id]
router.delete(
    '/delete/:id', 
    checkToken,
    checkAdmin,
    UserController.delete
);

// [path: user/signUp]
router.post(
    '/signUp',
    UserController.signUp
);

// [path: user/signIn]
router.post(
    '/signIn',
    handleExpiredContract, 
    UserController.signIn
);

// [path: user/findUserByGroupId/:groupId]
router.get(
    '/logOut', 
    UserController.logOut
);

// [path: user/findUserByGroupId/:groupId]
router.get(
    '/refresh', 
    checkToken,
    handleExpiredContract,
    UserController.refresh
);

// [path: user/findUserByGroupId/:groupId]
router.post(
    '/findUserByEmail',
    checkToken, 
    UserController.getUserByEmail
);

// [path: user/findUserByGroupId/:groupId]
router.get(
    '/findUserByGroupId/:groupId', 
    checkToken,
    checkAdmin,
    UserController.getUserByGroupId
);

// [path: user/:id]
router.get(
    '/:id', 
    checkToken, 
    UserController.getDetails
);

// [path: user/]
router.get(
    '/', 
    checkToken,
    checkAdmin,
    UserController.getAll  
);

module.exports = router;