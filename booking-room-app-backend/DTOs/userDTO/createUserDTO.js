const joi = require('joi');

const createUserDTO = joi.object({
    email: joi.string().email().required(),
    phone: joi.string().min(10).required(),
    name: joi.string().allow(null, ''),
    password: joi.string().allow(null, ''),
    avatar: joi.string().allow(null, ''),
    // groupId: joi.number().integer().required(),
    // IDentify: joi.string().allow(null, ''),
})

module.exports = createUserDTO;