const express = require('express');
const router = express.Router();
const RoomController = require('../Controller/RoomController.js');
const handleExpiredContract = require('../middlewares/handleExpiredContract.js');
const checkManager = require('../middlewares/checkManager.js');
const checkToken = require('../middlewares/checkToken.js');
const checkAdmin = require('../middlewares/checkAdmin.js');

// [path: room/create]
router.post(
    '/create',  
    checkToken,
    checkAdmin, 
    RoomController.create
);        

// [path: room/delete/:id]
router.delete(
    '/delete/:id', 
    checkToken,
    checkAdmin,
    RoomController.delete
);

// [path: room/update]
router.put(
    '/update',
    checkToken, 
    checkAdmin,
    RoomController.update
);

// [path: room/getAllRoomId]
router.get(
    '/getAllRoomId',
    checkToken, 
    checkManager, 
    handleExpiredContract, 
    RoomController.getAllRoomId
);

// [path: room/:id]
router.get(
    '/:id',
    checkToken, 
    RoomController.getRoomById
);

// [path: room/]
router.get(
    '/',
    handleExpiredContract, 
    RoomController.getAll
);

module.exports = router;