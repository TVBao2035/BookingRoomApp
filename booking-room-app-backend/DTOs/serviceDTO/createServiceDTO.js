const joi = require('joi');

const createServiceDTO = joi.object({
    name: joi.string().required(),
})

module.exports = createServiceDTO;