const express = require('express');
const RoomServiceController = require('../Controller/RoomServiceController');
const router = express.Router();

router.put('/:id', RoomServiceController.update);
router.delete('/:id', RoomServiceController.delete);
router.post('/', RoomServiceController.create);
router.get('/', RoomServiceController.getAll);

module.exports = router;
