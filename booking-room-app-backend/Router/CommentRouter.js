const express = require('express');
const CommentController = require('../Controller/CommentController');
const router = express.Router();

router.put('/create', CommentController.create);
router.get('/room/:id', CommentController.getAll);
module.exports = router;