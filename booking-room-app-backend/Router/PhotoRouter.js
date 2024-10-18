const express = require('express');
const router = express.Router();
const PhotoController = require('../Controller/PhotoController.js');
const checkToken = require('../middlewares/checkToken.js');
const checkAdmin = require('../middlewares/checkAdmin.js');

// [path: photo/create]
router.post(
    '/create',
    checkToken,
    checkAdmin,
    PhotoController.create
);

// [path: photo/delete]
router.delete(
    '/delete/:id',
    checkToken,
    checkAdmin,
    PhotoController.delete
);

// [path: photo/update]
router.put(
    '/update',
    checkToken,
    checkAdmin,
    PhotoController.update
);

// [path: photo/]
router.get(
    '/',
    checkToken,
    checkAdmin,
    PhotoController.getAll
);


module.exports = router;