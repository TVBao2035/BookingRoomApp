const joi = require('joi');

const createContractDTO = joi.object({
    userId: joi.number().allow(null, '').default(0),
    email: joi.string().email().allow(null, ''),
    phone: joi.string().allow('', null),
    sales: joi.number().allow('', null),
    roomId: joi.number().required(), 
    startDate: joi.string().required(), 
    endDate: joi.string().required(), 
})

module.exports = createContractDTO;