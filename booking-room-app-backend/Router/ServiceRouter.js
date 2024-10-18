const express = require('express');
const ServiceController = require('../Controller/ServiceController');
const router = express.Router();

router.delete('/delete/:id', ServiceController.delete);
router.put('/update', ServiceController.update);
router.post('/create', ServiceController.create);
router.get('/getAllServiceWithIdName', ServiceController.getAllServiceWithIdName);
router.get('/', ServiceController.getAll);
module.exports = router;