const express = require('express');
const LikeController = require('../Controller/LikeController');
const router = express.Router();

router.delete(`/delete`, LikeController.delete);
router.post('/create', LikeController.create);
router.get('/comment/:id', LikeController.getAllByCommentId);
module.exports = router;