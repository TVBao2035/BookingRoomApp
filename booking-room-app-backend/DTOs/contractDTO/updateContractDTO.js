const joi = require('joi');

const updateContractDTO = joi.object({
    roomId: joi.number().required(),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    sales: joi.number()
})

module.exports = updateContractDTO;