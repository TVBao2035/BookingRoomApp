const joi = require('joi');

const updateUserDTO = joi.object({
    email: joi.string().email().required(),
    phone: joi.string().min(10).required(),
    id: joi.number().allow(null, ''),
    avatar: joi.string().allow(null, ''),
    groupId: joi.number().allow(null, ''),
    IDentify: joi.string().allow(null, ''),
    createdAt: joi.string().allow(null, ''),
    name: joi.string(),
})

module.exports = updateUserDTO;