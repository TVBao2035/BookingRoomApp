const joi = require('joi');

const updateServiceDTO = joi.object({
    id: joi.number().required(),
    name: joi.string().allow(null, ""),
})

module.exports = updateServiceDTO;