const express = require('express');
const router = express.Router();
const HistoryController = require('../Controller/HistoryController.js');
const checkToken = require('../middlewares/checkToken.js');
const checkManager = require('../middlewares/checkManager.js');
// [path: history/getRevenueOfEachRoom]
router.get(
    `/getRevenueOfEachRoom`, 
    checkToken,
    checkManager,
    HistoryController.getRevenueOfEachRoom
);
// [path: history/getRevenueOfAllRoomsEachMonth]
router.get(
    `/getRevenueOfAllRoomsEachMonth/:year`, 
    checkToken,
    checkManager,
    HistoryController.getRevenueOfAllRoomsEachMonth
);
// [path: history/user/:id]
router.get(
    '/user/:id/', 
    checkToken,
    HistoryController.getHistoryByUserId
);

// [path: history/]
router.get(
    '/', 
    checkToken,
    checkManager,
    HistoryController.getAll
);


module.exports = router;