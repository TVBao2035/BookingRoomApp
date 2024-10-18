const dateFormat = require('../helpers/dateFormat.js');
const ContractService = require('../Service/ContractService.js');
const handleExpiredContract = async (req, res, next) => {
    try {
        const allContracts = await ContractService.checkExprised();
        for(let contract of allContracts.data){
            await ContractService.delete(contract.id)
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: `Error Check Contract Exprised ${error}`
        })
    }
}

module.exports = handleExpiredContract;