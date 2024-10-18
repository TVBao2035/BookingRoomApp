const express = require('express');
const router = express.Router();
const ContractController = require('../Controller/ContractController.js');
const checkToken = require('../middlewares/checkToken.js');
const handleExpiredContract = require('../middlewares/handleExpiredContract.js');
const checkManager = require('../middlewares/checkManager.js');
//[path: contract/create]
router.post(
    '/create', 
    checkToken, 
    ContractController.create
);

//[path: contract/update/:id]
router.put(
    '/update/:id', 
    checkToken,
    checkManager,
    ContractController.update
);

//[path: contract/delete/:id]
router.delete(
    '/delete/:id', 
    checkToken, 
    checkManager,
    ContractController.delete
);

//[path: contract/user/:id]
router.get(
    '/user/:id', 
    checkToken,
    handleExpiredContract, 
    ContractController.getContractByUserId
);

//[path: contract/]
router.get(
    '/', 
    checkToken, 
    checkManager,
    handleExpiredContract, 
    ContractController.getAll
);

module.exports = router;